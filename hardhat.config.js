require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

// deployment address :  0x85d8B16a707571B423EBE3fa22aA108063A19936

module.exports = {
  solidity: "0.8.17",
  networks: {
    mumbai: {
      url: "https://polygon-mumbai.g.alchemy.com/v2/KZ-QoOrvHJotsUh0HW1CqqgfiGjzE8qD",
      accounts: [process.env.PRIVATE_KEY],
    },
  },
  paths: {
    artifacts: "./artifacts",
  },
  etherscan : {
    apiKey: process.env.POLYGONSCAN_API_KEY
  }
};
