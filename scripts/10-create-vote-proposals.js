import sdk from "./1-initialize-sdk.js";
import { ethers } from "ethers";

// Nosso contrato de votação.
const vote = sdk.getVote("0xf0206eCF87D87333C6ac7Fe70a8a60c76f652dE7");

// Nosso contrato ERC-20.
const token = sdk.getToken("0x809DE10580bD8984EFbe51abc30C9a2AdFA52b22");

(async () => {
  try {
    const amount = 420_000;
    
    const description = "Cunhar para a DAO uma quantidade adicional de " + amount + " tokens no tesouro?";

    const executions = [
      {

        toAddress: token.getAddress(),

        nativeTokenValue: 0,

        transactionData: token.encoder.encode(
          "mintTo", [
            vote.getAddress(),
            ethers.utils.parseUnits(amount.toString(), 18),
          ]
        ),
      }
    ];

    await vote.propose(description, executions);


    console.log("✅ Proposta de cunhar tokens criada com sucesso!");
  } catch (error) {
    console.error("falha ao criar primeira proposta", error);
    process.exit(1);
  }

  try {
  
    const amount = 6_900;

    const description = "A DAO deveria transferir " + amount + " tokens do tesouro para " +
      process.env.WALLET_ADDRESS + " para comprar skins?";

    const executions = [
      {
 
        nativeTokenValue: 0,
        transactionData: token.encoder.encode(
 
          "transfer",
          [
            process.env.WALLET_ADDRESS,
            ethers.utils.parseUnits(amount.toString(), 18),
          ]
        ),

        toAddress: token.getAddress(),
      },
    ];

    await vote.propose(description, executions);

    console.log(
      "✅ Proposta de dar prêmio do tesouro para si mesmo criada com sucesso, vamos torcer para votarem sim!"
    );
  } catch (error) {
    console.error("falha ao criar segunda proposta", error);
  }
})();