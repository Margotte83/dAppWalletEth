import { useState, useCallback, useEffect } from "react";
import Head from "next/head";
import Web3 from "web3";

import StorageABI from "../contract/storage.json";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "../styles/Home.module.css";

export default function Home() {
  const [isConnectedWeb3, setIsConnectedWeb3] = useState(false);
  const [accounts, setAccounts] = useState([]);
  const [balance, setBalance] = useState(0);

  const [decimals, setDecimals] = useState(18);
  const [symbol, setSymbol] = useState("ETH");

  const [web3] = useState(
    new Web3(Web3.givenProvider || "ws://localhost:8545")
  );

  const [weiToSend, setWeiToSend] = useState(0);
  const [addressToSend, setAddressToSend] = useState("");

  const connectToWeb3 = useCallback(async () => {
    if (window.ethereum) {
      try {
        await window.ethereum.request({ method: "eth_requestAccounts" });

        setIsConnectedWeb3(true);
      } catch (err) {
        console.error(err);
      }
    } else {
      alert("Install Metamask");
    }
  });

  useEffect(() => {
    initBalance();
  });

  const initBalance = () => {
    if (web3 && accounts && accounts.length > 0) {
      web3.eth.getBalance(accounts[0]).then((newBalance) => {
        setBalance(newBalance);
      });
    }
  };

  useEffect(() => {
    // Accounts
    const getAccounts = async () => setAccounts(await web3.eth.getAccounts());
    const getBalance = async () => {
      const changeWei = web3.eth.getBalance(accounts[0]);
      setBalance(web3.utils.fromWei((await changeWei).toString(), "Ether"));
    };
    if (accounts.length == 0) getAccounts();
    if (accounts.length > 0) getBalance();
  }, [isConnectedWeb3, accounts]);

  const sendEth = useCallback(async () => {
    await web3.eth.sendTransaction({
      from: accounts[0],
      to: addressToSend,
      value: web3.utils.toWei(weiToSend, "ether"),
    });
  }, [accounts, addressToSend, weiToSend]);

  const storageContract = new web3.eth.Contract(
    StorageABI,
    "0xe5d6d7e2680284baA6DAA837b052e23309F5667F"
  );
  //display the connected mainnet
  const getNetwork = () => {
    const chainId = web3.currentProvider.chainId;
    let network;

    switch (chainId) {
      case "0x1":
        network = "Ethereum";
        break;
      case "0x2a":
        network = "Kovan";
        break;
      case "0x3":
        network = "Ropsten";
        break;
      case "0x4":
        network = "Rinkeby";
        break;
      case "0x5":
        network = "Goerli";
        break;
      default:
        break;
    }
    return network;
  };
  /**
   * Rend JSX
   */
  return (
    <div className={"container mb-5"}>
      <Head>
        <title>Wallet dApp</title>
        <meta name="description" content="Wallet dApp" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        {!isConnectedWeb3 ? (
          <button className="btn btn-primary btn-lg" onClick={connectToWeb3}>
            Connect to web3
          </button>
        ) : (
          <button className="btn btn-secondary btn-lg disabled" disabled>
            {getNetwork()}
          </button>
        )}

        <div className={"container mb-5"}>
          <h1>Wallet dApp</h1>

          <p>My Address Wallet: {accounts[0]}</p>

          <p>
            Amount Ether: {balance / 10 ** decimals} {symbol}
          </p>

          <div className={"row"}>
            <div className={"col-sm-6"}>
              <div className="row mt-2">
                <label className="col-4 col-form-label">Address: </label>
                <div className={"col-8 p-0"}>
                  <input
                    className={"form-control"}
                    type="text"
                    onChange={(e) => setAddressToSend(e.target.value)}
                    value={addressToSend}
                  />
                </div>
              </div>

              <div className="row mt-2">
                <label className="col-4 col-form-label">Amount:</label>
                <div className={"col-8 p-0"}>
                  <input
                    className={"form-control"}
                    type="number"
                    onChange={(e) => setWeiToSend(e.target.value)}
                    value={weiToSend}
                  />
                </div>
              </div>

              <div className={"text-end"}>
                <button
                  type="button"
                  className="btn btn-primary mt-3"
                  onClick={sendEth}
                >
                  Send
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <footer className={styles.footer}>
        <a
          href="https://github.com/Margotte83/dAppWalletEth"
          rel="noreferrer"
          target="_blank"
        >
          My Github link
        </a>
      </footer>
    </div>
  );
}
