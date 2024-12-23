#!/usr/bin/env node
import "dotenv/config";
import { uploader } from "./uploader";
import { indexer } from "./indexer";
import { connect } from "@rudolph/db";

export const main = async () => {
  const {
    MONGO_INITDB_ROOT_USERNAME,
    MONGO_INITDB_ROOT_PASSWORD,
    MONGO_CLI_HOST,
    MONGO_INITDB_PORT,
    MONGO_INITDB_DATABASE,
  } = process.env;

  if (
    !MONGO_INITDB_ROOT_USERNAME ||
    !MONGO_INITDB_ROOT_PASSWORD ||
    !MONGO_INITDB_DATABASE
  ) {
    throw new Error("Missing environment variables");
  }

  const cmd = process.argv[2];
  const args = process.argv.slice(3);

  if (!cmd) throw new Error("Command not defined");

  await connect(
    MONGO_INITDB_ROOT_USERNAME,
    MONGO_INITDB_ROOT_PASSWORD,
    MONGO_INITDB_DATABASE,
    MONGO_CLI_HOST,
    MONGO_INITDB_PORT
  );

  switch (cmd) {
    case "uploader":
      await uploader(args[0]);
      break;
    case "indexer":
      await indexer();
      break;
    default:
      throw new Error("Command not found");
  }

  process.exit(0);
};

main().catch(console.error);
