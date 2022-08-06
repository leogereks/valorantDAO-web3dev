import sdk from "./1-initialize-sdk.js";


const token = sdk.getToken("0x809DE10580bD8984EFbe51abc30C9a2AdFA52b22");

(async () => {
  try {
   
    const amount = 1_000_000;
    
    await token.mintToSelf(amount);
    const totalSupply = await token.totalSupply();
    
    
    console.log("✅ Agora temos", totalSupply.displayValue, "$VALORAS em circulação");
  } catch (error) {
    console.error("Falha ao imprimir o dinheiro", error);
  }
})();