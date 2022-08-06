import {useAddress, useMetamask,useEditionDrop, useToken, useVote,useNetwork,} from "@thirdweb-dev/react";
import { ChainId } from "@thirdweb-dev/sdk";
import { useState, useEffect, useMemo } from "react";
import { AddressZero } from "@ethersproject/constants";

const App = () => {
  const address = useAddress();

  const network = useNetwork();

  const connectWithMetamask = useMetamask();

  console.log("👋 Address:", address);

  const editionDrop = useEditionDrop(
    "0x06C46d825aff923201cC37bF63CD9e3d3DE4cFD4"
  );

  const token = useToken("0x809DE10580bD8984EFbe51abc30C9a2AdFA52b22");

  const vote = useVote("0xf0206eCF87D87333C6ac7Fe70a8a60c76f652dE7");

  const [hasClaimedNFT, setHasClaimedNFT] = useState(false);

  const [isClaiming, setIsClaiming] = useState(false);

  const [memberTokenAmounts, setMemberTokenAmounts] = useState([]);

  const [memberAddresses, setMemberAddresses] = useState([]);

  const shortenAddress = (str) => {
    return str.substring(0, 6) + "..." + str.substring(str.length - 4);
  };

  const [proposals, setProposals] = useState([]);

  const [isVoting, setIsVoting] = useState(false);

  const [hasVoted, setHasVoted] = useState(false);

  useEffect(() => {
    if (!hasClaimedNFT) {
      return;
    }

    const getAllProposals = async () => {
      try {
        const proposals = await vote.getAll();
        setProposals(proposals);
        console.log("🌈 Propostas:", proposals);
      } catch (error) {
        console.log("falha ao buscar propostas", error);
      }
    };
    getAllProposals();
  }, [hasClaimedNFT, vote]);

  useEffect(() => {
    if (!hasClaimedNFT) {
      return;
    }

    if (!proposals.length) {
      return;
    }

    const checkIfUserHasVoted = async () => {
      try {
        const hasVoted = await vote.hasVoted(proposals[0].proposalId, address);
        setHasVoted(hasVoted);
        if (hasVoted) {
          console.log("🥵 Usuário já votou");
        } else {
          console.log("🙂 Usuário ainda não votou");
        }
      } catch (error) {
        console.error("Falha ao verificar se carteira já votou", error);
      }
    };
    checkIfUserHasVoted();
  }, [hasClaimedNFT, proposals, address, vote]);

  useEffect(() => {
    if (!hasClaimedNFT) {
      return;
    }

    const getAllAddresses = async () => {
      try {
        const memberAddresses =
          await editionDrop.history.getAllClaimerAddresses(0);
        setMemberAddresses(memberAddresses);
        console.log("🚀 Endereços de membros", memberAddresses);
      } catch (error) {
        console.error("falha ao pegar lista de membros", error);
      }
    };
    getAllAddresses();
  }, [hasClaimedNFT, editionDrop.history]);

  useEffect(() => {
    if (!hasClaimedNFT) {
      return;
    }

    const getAllBalances = async () => {
      try {
        const amounts = await token.history.getAllHolderBalances();
        setMemberTokenAmounts(amounts);
        console.log("👜 Quantidades", amounts);
      } catch (error) {
        console.error("falha ao buscar o saldo dos membros", error);
      }
    };
    getAllBalances();
  }, [hasClaimedNFT, token.history]);

  const memberList = useMemo(() => {
    return memberAddresses.map((address) => {
      const member = memberTokenAmounts?.find(
        ({ holder }) => holder === address
      );

      return {
        address,
        tokenAmount: member?.balance.displayValue || "0",
      };
    });
  }, [memberAddresses, memberTokenAmounts]);

  useEffect(() => {
    if (!address) {
      return;
    }

    const checkBalance = async () => {
      try {
        const balance = await editionDrop.balanceOf(address, 0);
        if (balance.gt(0)) {
          setHasClaimedNFT(true);
          console.log("🌟 esse usuário tem o NFT, um verdadeiro Valoros@!");
        } else {
          setHasClaimedNFT(false);
          console.log("😭 esse usuário NÃO tem o NFT de membro.");
        }
      } catch (error) {
        setHasClaimedNFT(false);
        console.error("Falha ao ler saldo", error);
      }
    };
    checkBalance();
  }, [address, editionDrop]);

  const mintNft = async () => {
    try {
      setIsClaiming(true);
      await editionDrop.claim("0", 1);
      console.log(
        `🌊 Cunhado com sucesso! Olhe na OpenSea: https://testnets.opensea.io/assets/${editionDrop.getAddress()}/0`
      );
      setHasClaimedNFT(true);
    } catch (error) {
      setHasClaimedNFT(false);
      console.error("Falha ao cunhar NFT", error);
    } finally {
      setIsClaiming(false);
    }
  };

  if (address && network?.[0].data.chain.id !== ChainId.Rinkeby) {
    return (
      <div className="unsupported-network">
        <h2>Por favor, conecte-se à rede Rinkeby</h2>
        <p>
          Essa dapp só funciona com a rede Rinkeby, por favor troque de rede na
          sua carteira.
        </p>
      </div>
    );
  }

  if (!address) {
    return (
      <div className="landing">
        <div className="at-container">
          <h1>Bem vindo, valoroso <span>valorant</span>DAO a DAO de <span className="at-item">Valorant</span>!</h1>
        </div>
        <div className="at-button">
        <button onClick={connectWithMetamask} className="btn-hero">
          CONECTE SUA CARTEIRA
        </button>
        </div>
      </div>
    );
  }

  // Se o usuário já reivindicou seu NFT nós queremos mostrar a página interna da DAO para ele
  // Apenas membros da DAO vão ver isso. Renderize todos os membros + quantidade de tokens
  if (hasClaimedNFT) {
    return (
      <div className="member-page">
        <h1>Pagina dos membros da <span>valorant</span>DAO 💻🎮</h1>
        {/* <p>Seja bem vindo, Valoros@</p> */}
        <div>
          <div className="nft-container">
            <h2>Seu NFT</h2>
            <div className="nft card">
              <nft-card
                contractAddress="0x06c46d825aff923201cc37bf63cd9e3d3de4cfd4"
                tokenId="0" network="rinkeby" height="40vh" width="448px">
              </nft-card>
            </div>
          </div>
          <div>
          <h2>Lista de Membros</h2>
            <table className="card">
              <thead>
                <tr>
                  <th>Endereco</th>
                  <th> Tokens</th>
                </tr>
              </thead>
              <tbody>
                {memberList.map((member) => {
                  return (
                    <tr key={member.address}>
                      <td>{shortenAddress(member.address)}</td>
                      <td>{member.tokenAmount}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <h2>Propostas ativas</h2>
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                e.stopPropagation();

                //antes de fazer as coisas async, desabilitamos o botão para previnir duplo clique
                setIsVoting(true);

                // pega os votos no formulário
                const votes = proposals.map((proposal) => {
                  const voteResult = {
                    proposalId: proposal.proposalId,
                    //abstenção é a escolha padrão
                    vote: 2,
                  };
                  proposal.votes.forEach((vote) => {
                    const elem = document.getElementById(
                      proposal.proposalId + "-" + vote.type
                    );

                    if (elem.checked) {
                      voteResult.vote = vote.type;
                      return;
                    }
                  });
                  return voteResult;
                });

                // certificamos que o usuário delega seus tokens para o voto
                try {
                  //verifica se a carteira precisa delegar os tokens antes de votar
                  const delegation = await token.getDelegationOf(address);
                  // se a delegação é o endereço 0x0 significa que eles não delegaram seus tokens de governança ainda
                  if (delegation === AddressZero) {
                    //se não delegaram ainda, teremos que delegar eles antes de votar
                    await token.delegateTo(address);
                  }
                  // então precisamos votar nas propostas
                  try {
                    await Promise.all(
                      votes.map(async ({ proposalId, vote: _vote }) => {
                        // antes de votar, precisamos saber se a proposta está aberta para votação
                        // pegamos o último estado da proposta
                        const proposal = await vote.get(proposalId);
                        // verifica se a proposta está aberta para votação (state === 1 significa está aberta)
                        if (proposal.state === 1) {
                          // se está aberta, então vota nela
                          return vote.vote(proposalId, _vote);
                        }
                        // se a proposta não está aberta, returna vazio e continua
                        return;
                      })
                    );
                    try {
                      // se alguma proposta está pronta para ser executada, fazemos isso
                      // a proposta está pronta para ser executada se o estado é igual a 4
                      await Promise.all(
                        votes.map(async ({ proposalId }) => {
                          // primeiro pegamos o estado da proposta novamente, dado que podemos ter acabado de votar
                          const proposal = await vote.get(proposalId);

                          //se o estado é igual a 4 (pronta para ser executada), executamos a proposta
                          if (proposal.state === 4) {
                            return vote.execute(proposalId);
                          }
                        })
                      );
                      // se chegamos aqui, significa que votou com sucesso, então definimos "hasVoted" como true
                      setHasVoted(true);
                      console.log("votado com sucesso");
                    } catch (err) {
                      console.error("falha ao executar votos", err);
                    }
                  } catch (err) {
                    console.error("falha ao votar", err);
                  }
                } catch (err) {
                  console.error("falha ao delegar tokens");
                } finally {
                  // de qualquer modo, volta isVoting para false para habilitar o botão novamente
                  setIsVoting(false);
                }
              }}
            >
              {proposals.map((proposal) => (
                <div key={proposal.proposalId} className="card">
                  <h5>{proposal.description}</h5>
                  <div>
                    {proposal.votes.map(({ type, label }) => {
                      const translations = {
                        Against: "Contra",
                        For: "A favor",
                        Abstain: "Abster-se",
                      };
                      return (
                        <div className="testRadio" key={type}>
                          <input
                            type="radio"
                            id={proposal.proposalId + "-" + type}
                            name={proposal.proposalId}
                            value={type}
                            //valor padrão "abster" vem habilitado
                            defaultChecked={type === 2}
                          />
                          <label htmlFor={proposal.proposalId + "-" + type}>
                            {translations[label]}
                          </label>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
              <button disabled={isVoting || hasVoted} type="submit">
                {isVoting
                  ? "Votando..."
                  : hasVoted
                  ? "Voce ja votou"
                  : "Submeter votos"}
              </button>
              {!hasVoted && (
                <small>
                  Isso vai submeter transações que você precisará
                  assinar.
                </small>
              )}
            </form>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mint-nft">
      <h1>Seu NFT gratuitamente de membro da 💻🎮valorantDAO</h1>
      <button disabled={isClaiming} onClick={mintNft}>
        {isClaiming ? "Cunhando..." : "Cunhe seu NFT (GRATIS)"}
      </button>
    </div>
  );
};

export default App;
