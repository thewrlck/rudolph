import { Request, Response } from "express";
import { Transaction } from "@rudolph/db";

export const transactionsCount = async (
  req: Request<{ address?: string }>,
  res: Response
) => {
  try {
    if (!req.params.address) throw new Error("Address required");
    const from = await Transaction.countDocuments({
      from: req.params.address,
    });
    const to = await Transaction.countDocuments({
      to: req.params.address,
    });
    res.json({ from, to });
  } catch (e) {
    const message = e instanceof Error ? e.message : "Something went wrong";
    res.status(400).json({ error: message });
  }
};
