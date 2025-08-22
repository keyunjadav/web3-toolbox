require('dotenv').config();
const { ethers } = require('ethers');
const fs = require('fs');
const path = require('path');

async function main() {
  const rpc = process.env.RPC_URL;
  const addr = process.env.CONTRACT_ADDRESS;
  if (!rpc || !addr) throw new Error("Missing RPC_URL or CONTRACT_ADDRESS");

  const abiPath = path.join(__dirname, '..', 'abi', 'SimpleNFT.json');
  const abi = JSON.parse(fs.readFileSync(abiPath, 'utf8'));

  const provider = new ethers.providers.JsonRpcProvider(rpc);
  const contract = new ethers.Contract(addr, abi, provider);

  const name = await contract.name();
  const symbol = await contract.symbol();
  const totalSupply = await contract.totalSupply();
  console.log({ name, symbol, totalSupply: totalSupply.toString() });
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
