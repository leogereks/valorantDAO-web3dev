import { AddressZero } from "@ethersproject/constants";
import sdk from "./1-initialize-sdk.js";

(async () => {
  try {

    const tokenAddress = await sdk.deployer.deployToken({
      // Qual o nome do seu token? Ex. "Ethereum"
      name: "Token de Governança da valorantDAO",
      // Qual o símbolo do seu token? Ex. "ETH"
      symbol: "VAVA",

      primary_sale_recipient: AddressZero,
    });
    console.log(
      "✅ Módulo de token implantado com sucesso. Endereço:",
      tokenAddress,
    );
  } catch (error) {
    console.error("falha ao implantar módulo do token", error);
  }
})();