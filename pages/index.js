import { useState, useCallback, useEffect } from 'react'
import Head from 'next/head'
import Image from 'next/image'

import Web3 from 'web3'

import StorageABI from '../contract/storage.json'

import styles from '../styles/Home.module.css'

export default function Home() {
  const [isConnectedWeb3, setIsConnectedWeb3] = useState(false)
  const [accounts, setAccounts] = useState([])
  const [balance, setBalance] = useState(0)
  const [web3] = useState(new Web3(Web3.givenProvider || "ws://localhost:8545"))
  const [weiToSend, setWeiToSend] = useState(0)
  const [addressToSend, setAddressToSend] = useState("")
  const [number, setNumber] = useState(0)
  const [numberInput, setNumberInput] = useState(0)

  const connectToWeb3 = useCallback(
    async () => {
      if(window.ethereum) {
        try {
          await window.ethereum.request({method: 'eth_requestAccounts'})

          setIsConnectedWeb3(true)
        } catch (err) {
          console.error(err)
        }
      } else {
        alert("Install Metamask")
      }
    }
  )

  useEffect(() => {
    // Accounts
    const getAccounts = async () => setAccounts(await web3.eth.getAccounts())
    const getBalance = async () => {
      const changeWei = web3.eth.getBalance(accounts[0]);
      setBalance (web3.utils.fromWei((await changeWei).toString(),"Ether"))
  }
  if (accounts.length == 0) getAccounts()
  if (accounts.length > 0) getBalance()
}, [isConnectedWeb3, accounts])

  const sendEth = useCallback(
    async () => {
      await web3.eth.sendTransaction({ from: accounts[0], to: addressToSend, value: web3.utils.toWei(weiToSend, 'ether') })
    },
    [accounts, addressToSend, weiToSend]
  )

   useEffect(() => {
     const getNumber = async () => {
      const storageContract = new web3.eth.Contract(
         StorageABI,
         "0xEEbCbE87BaB901B40e83ebB9F3483f3a3A7fd15b"
       )

      setNumber(await storageContract.methods.retrieve().call({ from: accounts[0]}))
    }

    getNumber()
  }, [accounts])

  const sendNewNumber = useCallback(
    async () => {
      const storageContract = new web3.eth.Contract(
        StorageABI,
        "0xEEbCbE87BaB901B40e83ebB9F3483f3a3A7fd15b"
      )
  
      await storageContract.methods.store(numberInput).send({from: accounts[0]})
    },
    [accounts, numberInput]
  )

  return (
    <div className={styles.container}>
      <Head>
        <title>Wallet dApp</title>
        <meta name="description" content="Wallet dApp" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* // Responsive meta tag */}
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      {/* //  bootstrap CDN  */}
      <link
      href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/css/bootstrap.min.css" rel="stylesheet"
      integrity="sha384-giJF6kkoqNQ00vy+HMDP7azOuL0xtbfIcaT9wjKHr8RbDVddVHyTfAAsrekwKmP1"
      crossorigin="anonymous" 
  />
     <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/js/bootstrap.bundle.min.js"
     integrity="sha384-ygbV9kiqUc6oa4msXn9868pTtWMgiQaeYH7/t7LECLbyPA2x65Kgf80OJFdroafW"
     crossorigin="anonymous"></script>

      <main  className={styles.main}>
      {
          isConnectedWeb3
         
            ? <p><a target="_blank"><img src="https://etherscan.io/images/brandassets/etherscan-logo-circle.png" alt='Etherscan' className={styles.imgEth}></img></a></p>
      
            : <button class="btn btn-primary btn-lg" onClick={connectToWeb3}>Connect to web3</button>
        }
       
        <h1 className={styles.title}>
          Wallet dApp</h1>
        <h2></h2>
        <p>My Adress Wallet: {accounts[0]}</p>
        <p>Amount Ether: {balance}Eth</p>
        <h2></h2>
        <labe>Address: </labe><input type="text" onChange={e => setAddressToSend(e.target.value)} placeholder="Your address" /><br></br>
        <label>Amount:</label><input type="number" onChange={e => setWeiToSend(e.target.value)} placeholder="Eth" />
        <br></br>
        <button type="button" class="btn btn-secondary" onClick={sendEth}>Send</button>
        <h2></h2>
        <h2></h2>
        <p></p>
        <h2></h2>
      
      </main>
      <footer className={styles.footer}>
       <a href="" target="_blank">My Github link</a>
     </footer>
      </div>
       
  )
}
