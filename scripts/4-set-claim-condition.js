import sdk from "./1-initialize-sdk.js";
import { MaxUint256 } from "@ethersproject/constants";

const editionDrop = sdk.getEditionDrop("0x06C46d825aff923201cC37bF63CD9e3d3DE4cFD4");

(async () => {
  try {

    const claimConditions = [{

      startTime: new Date(),

      maxQuantity: 50_000,

      price: 0,

      quantityLimitPerTransaction: 1,

      waitInSeconds: MaxUint256,
    }]
    
    await editionDrop.claimConditions.set("0", claimConditions);

    console.log("✅ Condições de reinvidicação configuradas com sucesso!");
  } catch (error) {
    console.error("Falha ao definir condições de reinvidicação", error);
  }
})()