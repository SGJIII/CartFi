const USDC = artifacts.require("USDC");
const Bank = artifacts.require("Bank");
const Deposit = artifacts.require("Deposit");

module.exports = async function(deployer, network, accounts) {
  deployer.deploy(USDC);
  const usdc = await USDC.deployed();

  deployer.deploy(Bank);
  const bank = await Bank.deployed();

  deployer.deploy(Deposit);
  const deposit = await Deposit.deployed();

  //Transfer all tokens to Bank (1 million)
  await usdc.transfer(Bank.address, "100000000000000000000000");

  //Distribute 100 tokens to investor
  usdc.transfer(accounts[1], "1000000000000000");
};
