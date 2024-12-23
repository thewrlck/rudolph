import { Transaction } from "@rudolph/db";
import { Request, Response } from "express";

export const transactions = async (
  req: Request<
    unknown,
    unknown,
    unknown,
    {
      page?: string;
      limit?: string;
      value?: "asc" | "desc";
    }
  >,
  res: Response
) => {
  try {
    const { page, limit, value = "desc" } = req.query;

    const results = await Transaction.paginate(
      {},
      {
        page: page ? parseInt(page) : 1,
        limit: limit ? parseInt(limit) : 10,
        sort: {
          value: value === "asc" ? 1 : -1,
        },
      }
    );

    res.json(results);
  } catch (e) {
    const message = e instanceof Error ? e.message : "Something went wrong";
    res.status(400).json({ error: message });
  }
};
