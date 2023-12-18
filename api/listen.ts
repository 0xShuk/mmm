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
      console.log(tx)
      // tx.meta.innerInstructions.forEach(async(ix) => {
      //   ix.instructions.forEach(async(inIx) => {  
      //     if (tx.transaction.message.accountKeys[inIx.programIdIndex] === "mmm3XBJg5gk8XJxEKBvdgptZz6SgK4tXvn36sodowMc") {
      //       const parsedData = parseData(inIx.data);
      //       const transaction = new Transaction({
      //         params: JSON.stringify(parsedData?.data),
      //         sig: JSON.stringify(tx.transaction.signatures),
      //         accounts: inIx.accounts.map(num => tx.transaction.message.accountKeys[num]),
      //         type: parsedData?.name
      //       });
  
      //       try {
      //         await transaction.save();
      //       } catch(e) {
      //         res.status(403).send(e)
      //       }
      //     } else {
      //       return res.json({
      //         message: `Work Half Done!`,
      //       })
      //     }
      //   })
      // });
    })
    

    return res.json({
      message: `Work Done!`,
    })
  }
  return res.json({
    message: `Hello bearer!`,
  })
}
