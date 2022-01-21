require("dotenv").config();

require("@nomiclabs/hardhat-etherscan");
require("@nomiclabs/hardhat-waffle");
require("hardhat-gas-reporter");
require("solidity-coverage");
const { Wallet } = require("@ethersproject/wallet");
const accounts = require("./accounts.json");

const { alchemyApiKey, mnemonic } = require('./secrets.json');



// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

const deployerAccount = process.env.DEPLOYER_PRIVATE_KEY || Wallet.createRandom().privateKey;

const generateRandomAccounts = (numberOfAccounts) => {
  const accounts = new Array(numberOfAccounts);

  for (let i = 0; i < numberOfAccounts; ++i) {
    accounts[i] = Wallet.createRandom().privateKey;
  }

  return accounts;
};
// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.6.11",
  networks: {
    rinkeby: {
      url: `https://eth-rinkeby.alchemyapi.io/v2/${alchemyApiKey}`,
      // accounts: ["b8071ab98c90509b173743ae6511ecb38c54210a51adbb10ccb1995ee4ea7670"],
      accounts : { mnemonic: mnemonic }
    },
    fantom: {
      url : "https://rpc.testnet.fantom.network/",
      chainId : 4002,
      gas: 2000000,  // tx gas limit
      accounts : ["b8071ab98c90509b173743ae6511ecb38c54210a51adbb10ccb1995ee4ea7670"]
    },
  },
  gasReporter: {
    enabled: process.env.REPORT_GAS !== undefined,
    currency: "FTM",
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY,
  },
};

