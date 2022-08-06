import sdk from "./1-initialize-sdk.js";

const token = sdk.getToken("0x809DE10580bD8984EFbe51abc30C9a2AdFA52b22");

(async () => {
  try {
  
    const allRoles = await token.roles.getAll();

    console.log("👀 Papeis que existem agora:", allRoles);

    
    await token.roles.setAll({ admin: [], minter: [] });
    console.log(
      "🎉 Papeis depois de remover nós mesmos",
      await token.roles.getAll()
    );
    console.log("✅ Revogados nossos super-poderes sobre os tokens ERC-20");

  } catch (error) {
    console.error("Falha ao remover nossos direitos sobre o tesouro da DAO", error);
  }
})();