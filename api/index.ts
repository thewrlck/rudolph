import "dotenv/config";
import { connect } from "@rudolph/db";
import express from "express";
import swaggerUi from "swagger-ui-express";

import { transactions } from "./transactions";
import { transactionsByAddress } from "./transactions-by-address";
import { transactionsCount } from "./transactions-count";

import swagger from "./swagger.json";

// @ts-ignore https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt#use_within_json
BigInt.prototype.toJSON = function() { return this.toString() }

export const main = async () => {
  const {
    MONGO_INITDB_ROOT_USERNAME,
    MONGO_INITDB_ROOT_PASSWORD,
    MONGO_INITDB_PORT,
    MONGO_API_HOST,
    MONGO_INITDB_DATABASE,
    PORT,
  } = process.env;

  if (
    !MONGO_INITDB_ROOT_USERNAME ||
    !MONGO_INITDB_ROOT_PASSWORD ||
    !MONGO_INITDB_DATABASE
  ) {
    throw new Error("Missing environment variables");
  }

  await connect(
    MONGO_INITDB_ROOT_USERNAME,
    MONGO_INITDB_ROOT_PASSWORD,
    MONGO_INITDB_DATABASE,
    MONGO_API_HOST,
    MONGO_INITDB_PORT
  );

  const app = express();

  app.use(express.json());

  app.get("/", (_, res) => {
    res.send({ name: "rudolph", version: "0.0.1" });
  });

  app.use("/docs", swaggerUi.serve, swaggerUi.setup(swagger));

  app.get("/transactions/:address/count", transactionsCount);

  app.get("/transactions/:address", transactionsByAddress);

  app.get("/transactions", transactions);

  app.listen(PORT || 3000, () => {
    console.log(`Server listening on http://127.0.0.1:${PORT || 3000}`);
  });
};

main().catch(console.error);
