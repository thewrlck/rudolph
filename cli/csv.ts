import fs from "fs";
import parser from "csv-parser";
import { Transaction, Tx, isTx } from "@rudolph/db";

const BATCH_SIZE = 1000;

export const csv = async (filename: string) => {
  const rows: Tx[] = [];

  console.log(`Reading ${filename}`);

  await new Promise<void>((res, rej) => {
    fs.createReadStream(filename)
      .pipe(parser())
      .on("data", (row) => {
        if (!isTx(row)) {
          rej(Error("Invalid data"));
        }
        rows.push(row);
      })
      .on("end", async () => {
        res();
      })
      .on("error", (error) => {
        rej(error);
      });
  });

  for (let i = 0; i < rows.length; i += BATCH_SIZE) {
    const chunk = rows.slice(i, i + BATCH_SIZE);
    await Transaction.insertMany(chunk);
    console.log(`Uploaded ${i + BATCH_SIZE} transactions`);
  }

  console.log(`Finished uploading ${rows.length} transactions`);
};
