import * as dotenv from "dotenv";

import { HardhatUserConfig } from "hardhat/config";

import "@nomicfoundation/hardhat-ignition-ethers";
import "@nomiclabs/hardhat-waffle";
import "@typechain/hardhat";
import "solidity-coverage";
import "hardhat-deploy";
import "@nomiclabs/hardhat-ethers";

dotenv.config();

const solcVersion = "0.8.17";
const PRIVATE_KEY = process.env.ATHLETEX_DEPLOYER_PRIVATE_KEY || "";

const config: HardhatUserConfig = {
  solidity: {
    compilers: [{ version: solcVersion, settings: { optimizer: { enabled: true, runs: 1000000 } } }],
  },
  networks: {
    hardhat: { accounts: { accountsBalance: "1000000000000000000000000" } },
    // mainnet: {
    //   url: getNodeUrl("mainnet", true, 1),
    //   accounts: { mnemonic },
    //   saveDeployments: true,
    //   chainId: 1,
    // },

    polygon: {
      chainId: 137,
      url: 'https://polygon-rpc.com/',
      saveDeployments: true,
      accounts: [PRIVATE_KEY],
      // companionNetworks: { l1: "mainnet" },
    },
    // "polygon-mumbai": {
    //   chainId: 80001,
    //   url: getNodeUrl("polygon-mumbai", true, 80001),
    //   saveDeployments: true,
    //   accounts: { mnemonic },
    //   companionNetworks: { l1: "goerli" },
    // },
  },

  namedAccounts: { deployer: 0 },
  typechain: {
    outDir: "typechain",
    target: "ethers-v5",
  },
};

export default config;
