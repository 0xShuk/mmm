import {Keypair, PublicKey, Connection, clusterApiUrl} from "@solana/web3.js";
import {Wallet, Program, AnchorProvider, BorshCoder} from "@coral-xyz/anchor";
import snakeCase from 'just-snake-case';
import * as anchor from "@coral-xyz/anchor";
import idl from "./idl.json";
import {Idl} from "./idl"
import crypto from "crypto";

const keypair = Keypair.generate()

const wallet = new Wallet(keypair);
const connection = new Connection(clusterApiUrl("mainnet-beta"));

const provider = new AnchorProvider(connection, wallet, {commitment: "confirmed"});
const programId = new PublicKey("mmm3XBJg5gk8XJxEKBvdgptZz6SgK4tXvn36sodowMc");
const program = new Program<Idl>(idl as Idl, programId, provider);
const coder = new BorshCoder(idl as Idl);

export default function(data: string) {
    // const tx = program.idl.instructions.find(ix => data.slice(0,8) === 
    // crypto.createHash("sha256").update("global:"+snakeCase(ix.name)).digest("hex").slice(0,8)
    // );

    const parsedData = coder.instruction.decode(data, "hex");
    return parsedData;
}