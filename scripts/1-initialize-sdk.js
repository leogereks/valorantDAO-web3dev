import { ThirdwebSDK } from "@thirdweb-dev/sdk";
import ethers from "ethers";

import dotenv from "dotenv";
dotenv.config();

if (!process.env.PRIVATE_KEY || process.env.PRIVATE_KEY == "") {
  console.log("🛑 Chave privada não encontrada.")
}

if (!process.env.ALCHEMY_API_URL || process.env.ALCHEMY_API_URL == "") {
  console.log("🛑 Alchemy API não encontrada.")
}

if (!process.env.WALLET_ADDRESS || process.env.WALLET_ADDRESS == "") {
  console.log("🛑 Endereço de carteira não encontrado.")
}

const provider = new ethers.providers.JsonRpcProvider(process.env.ALCHEMY_API_URL);

const wallet = new ethers.Wallet(process.env.PRIVATE_KEY,provider);
const sdk = new ThirdwebSDK(wallet);

(async () => {
    try {
        const address = await sdk.getSigner().getAddress();
        console.log("👋 SDK inicializado pelo endereço:", address)
    } catch (err) {
        console.error ("Falha ao buscar apps no sdk", err);
        process.exit(1);
    }
})()

export default sdk;