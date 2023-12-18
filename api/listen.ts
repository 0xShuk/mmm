import type { VercelRequest, VercelResponse } from '@vercel/node'
import mongoose from "mongoose";
import Transaction from "../models/tx";
import parseData from "../utils/anchor";

try {
  mongoose.connect(process.env.MONGOOSE_URL as string);
} catch(e) {
  console.log(e)
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.headers.authorization && req.headers.authorization === process.env.HELIUS_HEADER) {
    const txObject = req.body[0];
    console.log(txObject)
    txObject.meta.innerInstructions.forEach(ix => {
      ix.instructions.forEach(async(inIx) => {
        if (txObject.transaction.message.accountKeys[inIx.programIdIndex] === "mmm3XBJg5gk8XJxEKBvdgptZz6SgK4tXvn36sodowMc") {
          const parsedData = parseData(inIx.data);
          const transaction = new Transaction({
            params: JSON.stringify(parsedData?.data),
            sig: JSON.stringify(txObject.transaction.signatures),
            accounts: inIx.accounts.map(num => txObject.transaction.message.accountKeys[num]),
            type: parsedData?.name
          });

          try {
            await transaction.save();
          } catch(e) {
            res.status(403).send(e)
          }
        }
      })
    });

    return res.json({
      message: `Work Done!`,
    })
  }
  return res.json({
    message: `Hello bearer!`,
  })
}
