import { Request, Response } from "express";
import { Transaction } from "@rudolph/db";

export const transactionsByAddress = async (
  req: Request<
    { address?: string },
    unknown,
    unknown,
    {
      page?: string;
      limit?: string;
      block_number?: "asc" | "desc";
      tx_index?: "asc" | "desc";
    }
  >,
  res: Response
) => {
  try {
    const { address } = req.params;
    if (!address) throw new Error("Address required");
    const { page, limit, block_number = "desc", tx_index = "asc" } = req.query;

    const results = await Transaction.paginate(
      { $or: [{ from: address }, { to: address }] },
      {
        page: page ? parseInt(page) : 1,
        limit: limit ? parseInt(limit) : 10,
        sort: {
          block_number: block_number === "asc" ? 1 : -1,
          tx_index: tx_index === "asc" ? 1 : -1,
        },
      }
    );

    res.json(results);
  } catch (e) {
    const message = e instanceof Error ? e.message : "Something went wrong";
    res.status(400).json({ error: message });
  }
};
