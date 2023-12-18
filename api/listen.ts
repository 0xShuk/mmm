import type { VercelRequest, VercelResponse } from '@vercel/node'
import mongoose from "mongoose";
import Transaction from "../models/tx";

try {
  mongoose.connect(process.env.MONGOOSE_URL as string);
} catch(e) {
  console.log(e)
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.headers.authorization) {
    const name = JSON.stringify(req.headers.authorization);
    const token = new Transaction({token: name});
    await token.save();

    return res.json({
      message: `Hello tokener!`,
    })
  }
  return res.json({
    message: `Hello bearer!`,
  })
}
