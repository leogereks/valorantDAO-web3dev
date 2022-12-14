import sdk from "./1-initialize-sdk.js";

const token = sdk.getToken("0x809DE10580bD8984EFbe51abc30C9a2AdFA52b22");

(async () => {
  try {
  
    const allRoles = await token.roles.getAll();

    console.log("๐ Papeis que existem agora:", allRoles);

    
    await token.roles.setAll({ admin: [], minter: [] });
    console.log(
      "๐ Papeis depois de remover nรณs mesmos",
      await token.roles.getAll()
    );
    console.log("โ Revogados nossos super-poderes sobre os tokens ERC-20");

  } catch (error) {
    console.error("Falha ao remover nossos direitos sobre o tesouro da DAO", error);
  }
})();