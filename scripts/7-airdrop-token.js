import sdk from "./1-initialize-sdk.js";

const editionDrop = sdk.getEditionDrop("0x06C46d825aff923201cC37bF63CD9e3d3DE4cFD4");

const token = sdk.getToken("0x809DE10580bD8984EFbe51abc30C9a2AdFA52b22");

(async () => {
  try {

    const walletAddresses = await editionDrop.history.getAllClaimerAddresses(0);
  
    if (walletAddresses.length === 0) {
      console.log(
        "Ninguém mintou o NFT ainda, peça para alguns amigos fazerem isso e ganhar um NFT de graça!",
      );
      process.exit(0);
    }
    

    const airdropTargets = walletAddresses.map((address) => {

      const randomAmount = Math.floor(Math.random() * (10000 - 1000 + 1) + 1000);
      console.log("✅ Vai enviar", randomAmount, "tokens para ", address);
      
      const airdropTarget = {
        toAddress: address,
        amount: randomAmount,
      };
  
      return airdropTarget;
    });
    
    console.log("🌈 Começando o airdrop...")
    await token.transferBatch(airdropTargets);
    console.log("✅ Feito o airdrop de tokens para todos os donos de NFT!");
  } catch (err) {
    console.error("O airdrop de tokens falhou", err);
  }
})();