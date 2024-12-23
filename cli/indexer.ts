import {
  createPublicClient,
  GetBlockReturnType,
  GetTransactionReceiptReturnType,
  GetTransactionReturnType,
  http,
} from "viem";
import { avalanche } from "viem/chains";
import { Transaction, Tx } from "@rudolph/db";

const client = createPublicClient({
  chain: avalanche,
  transport: http(),
});

export const indexer = async () => {
  let blockNumber = await client.getBlockNumber();
  while (true) {
    let block: GetBlockReturnType;

    try {
      block = await client.getBlock({ blockNumber });
    } catch {
      await new Promise((res) => setTimeout(res, 1000));
      continue;
    }

    console.log(`Indexing block ${blockNumber}`);

    let txs: Tx[] = [];

    for (const txId of block.transactions) {
      let tx: GetTransactionReturnType;
      let txReceipt: GetTransactionReceiptReturnType;

      try {
        tx = await client.getTransaction({ hash: txId });
        txReceipt = await client.getTransactionReceipt({ hash: txId });
      } catch {
        await new Promise((res) => setTimeout(res, 1000));
        continue;
      }

      console.log(`Indexing tx ${tx.hash}`);

      txs.push({
        timestamp: new Date().toISOString(),
        status: txReceipt.status === "success" ? "true" : "false",
        block_number: tx.blockNumber.toString(),
        tx_index: tx.transactionIndex.toString(),
        from: tx.from,
        to: tx.to || "0x0000000000000000000000000000000000000000",
        value: tx.value.toString(),
        gas_limit: tx.gas.toString(),
        gas_used: txReceipt.gasUsed.toString(),
        gas_price: (tx.gasPrice || 0).toString(),
      });
    }

    await Transaction.insertMany(txs);
    blockNumber += 1n;
  }
};
