import sdk from "./1-initialize-sdk.js";

(async () => {
  try {
    const voteContractAddress = await sdk.deployer.deployVote({

      name: "valorantDAO - A DAO dos valorosos",

      voting_token_address: "0x809DE10580bD8984EFbe51abc30C9a2AdFA52b22",

      voting_delay_in_blocks: 0,

      voting_period_in_blocks: 6570,

      voting_quorum_fraction: 0,

      proposal_token_threshold: 0,
    });

    console.log(
      "✅ Módulo de votos implantado com sucesso no endereço:",
      voteContractAddress,
    );
  } catch (err) {
    console.error("Falha ao implantar o módulo de votos", err);
  }
})();