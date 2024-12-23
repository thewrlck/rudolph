import mongoose, { Schema } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

export type Tx = {
  timestamp: string;
  status: string;
  block_number: string;
  tx_index: string;
  from: string;
  to: string;
  value: string;
  gas_limit: string;
  gas_used: string;
  gas_price: string;
};

export const txSchema = new Schema({
  timestamp: Date,
  status: Boolean,
  block_number: BigInt,
  tx_index: BigInt,
  from: String,
  to: String,
  value: BigInt,
  gas_limit: BigInt,
  gas_used: BigInt,
  gas_price: BigInt,
});

export const isTx = (data: any): data is Tx => {
  if (
    typeof data?.timestamp !== undefined &&
    typeof data?.status !== undefined &&
    typeof data?.block_number !== undefined &&
    typeof data?.tx_index !== undefined &&
    typeof data?.from !== undefined &&
    typeof data?.to !== undefined &&
    typeof data?.value !== undefined &&
    typeof data?.gas_limit !== undefined &&
    typeof data?.gas_used !== undefined &&
    typeof data?.gas_price !== undefined
  ) {
    return true;
  } else {
    return false;
  }
};

txSchema.plugin(mongoosePaginate);

interface TxDocument extends mongoose.Document, Tx {}

export const Transaction = mongoose.model<
  TxDocument,
  mongoose.PaginateModel<TxDocument>
>("Transaction", txSchema);
