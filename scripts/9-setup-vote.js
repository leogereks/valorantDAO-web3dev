import sdk from "./1-initialize-sdk.js";

// Esse é o nosso contrato de governança.
const vote = sdk.getVote("0xf0206eCF87D87333C6ac7Fe70a8a60c76f652dE7");

// Esse é o nosso contrato ERC-20.
const token = sdk.getToken("0x809DE10580bD8984EFbe51abc30C9a2AdFA52b22");

(async () => {
  try {
    
    await token.roles.grant("minter", vote.getAddress());

    console.log(
      "✅  Módulo de votos recebeu permissão de manipular os tokens com sucesso"
    );
  } catch (error) {
    console.error(
      "falha ao dar acesso aos tokens ao módulo de votos",
      error
    );
    process.exit(1);
  }

  try {
    const ownedTokenBalance = await token.balanceOf(
      process.env.WALLET_ADDRESS
    );

    const ownedAmount = ownedTokenBalance.displayValue;
    const percent90 = Number(ownedAmount) / 100 * 80;

    await token.transfer(
      vote.getAddress(),
      percent90
    ); 

    console.log("✅ Transferiu " + percent90 + " tokens para o módulo de votos com sucesso");
  } catch (err) {
    console.error("falhar ao transferir tokens ao módulo de votos", err);
  }
})();