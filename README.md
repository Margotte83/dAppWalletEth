# Create a dApp to exchange ethers 👨‍💼♦︎♦︎♦︎↔️🙍‍♀️
## Objectives of the quest:
The objective of the quest is simple, to create one of these Ethereum wallets, at least to implement the main functions:

Check your Ethereum balance;
Send ethers;
See his wallet on Etherscan via a link.

It's one of the most basic dApps but that doesn't mean it has to be easy to do. ✨

This quest allows you to practice on Web3Js and therefore to gain skills in this library. 🚀

A wallet implements these functions with web3Js (of course there is the equivalent on EthersJs):

display the wallet connected with this function web3.eth.getAccounts ();
display the balance with web3.eth.getBalance (<address>);
send ethers with the function web3.eth.sendTransaction ({from: addr, to: toAddress, value: amountToSend}).

  --------------------------------------------------------------------------------------------------------

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
