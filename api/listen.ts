import type { VercelRequest, VercelResponse } from '@vercel/node'
import mongoose from "mongoose";
import { text } from 'node:stream/consumers';
import Transaction from "../models/tx";
import parseData from "../utils/anchor";

try {
  mongoose.connect(process.env.MONGOOSE_URL as string);
} catch(e) {
  console.log(e)
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.headers.authorization && req.headers.authorization === process.env.HELIUS_HEADER) {
    const txObject = req.body;
    txObject.forEach(tx => {
      const message = tx.transaction.message;
      message.instructions.forEach(async(ix) => {
        if (message.accountKeys[ix.programIdIndex] === "mmm3XBJg5gk8XJxEKBvdgptZz6SgK4tXvn36sodowMc") {
          const parsedData = parseData(ix.data);
          const transaction = new Transaction({
            params: JSON.stringify(parsedData?.data),
            sig: JSON.stringify(tx.transaction.signatures),
            accounts: ix.accounts.map(num => message.accountKeys[num]),
            type: parsedData?.name
          });

          await transaction.save();
          return res.json({
            message: `Work Done!`,
          })
        }
      })
    });

    return res.json({
      message: `Not found!`,
    })
  } else {
    return res.json({
      message: `Hello bearer!`,
    })
  }
}
