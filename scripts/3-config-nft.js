import sdk from "./1-initialize-sdk.js";
import { readFileSync } from "fs";

const editionDrop = sdk.getEditionDrop("0x06C46d825aff923201cC37bF63CD9e3d3DE4cFD4");

const random = Math.ceil(Math.random()*10);

(async () => {
  try {
    await editionDrop.createBatch([
      {
        name: "Agente Valoros@",
        description: "Esse Agente vai te dar acesso a valorantDAO!",
        image: readFileSync(`scripts/assets/${random}.gif`),
      },
    ]);
    console.log("✅ Novo NFT criado com sucesso no drop !");
  } catch (error) {
    console.error("falha ao criar o novo NFT", error);
  }
})()