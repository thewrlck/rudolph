import { csv } from "./csv";

export const uploader = async (filename: string, type: "csv" = "csv") => {
  if (!filename.endsWith(type)) {
    throw new Error(`File must be ${type}`);
  }
  switch (type) {
    case "csv":
      return await csv(filename);
    default:
      throw new Error(`File type not supported`);
  }
};
