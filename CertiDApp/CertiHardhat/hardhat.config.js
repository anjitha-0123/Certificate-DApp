require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();
module.exports = {
  defaultNetwork:"sepolia",
  solidity: "0.8.28",
  networks:{
    localhost:{
      url:"http://127.0.0.1:8545/"
    },
    sepolia:{
      url:`https://eth-sepolia.g.alchemy.com/v2/${process.env.Sepolia_KEY}`,
      accounts:[process.env.PRIVATE_KEY]
    }
  }
};
