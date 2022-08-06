import { AddressZero } from "@ethersproject/constants";
import sdk from "./1-initialize-sdk.js";
import { readFileSync } from "fs";

(async () => {
  try {
    const editionDropAddress = await sdk.deployer.deployEditionDrop({
        name: "Membro da valorantDAO",

        description: "Uma DAO para os Valorosos do Valorant",

        image: readFileSync("scripts/assets/valorant-radiant.gif"),

        primary_sale_recipient: AddressZero,
    });

    const editionDrop = sdk.getEditionDrop(editionDropAddress);

    const metadata = await editionDrop.metadata.get();
    
    console.log(
      "✅ Contrato editionDrop implantado com sucesso, endereço:",
      editionDropAddress,
    );
    console.log(
      "✅ bundleDrop metadados:",
      metadata,
    );
  } catch (error) {
    console.log("falha ao implantar contrato editionDrop", error);
  }
})()