require('dotenv').config();
const { ethers } = require('ethers');

async function main() {
  const rpc = process.env.RPC_URL;
  const pk = process.env.PRIVATE_KEY;
  const to = process.env.TO_ADDRESS;

  if (!rpc || !pk || !to) {
    throw new Error("Missing RPC_URL, PRIVATE_KEY, or TO_ADDRESS in .env");
  }

  const provider = new ethers.providers.JsonRpcProvider(rpc);
  const wallet = new ethers.Wallet(pk, provider);

  const tx = await wallet.sendTransaction({
    to,
    value: ethers.utils.parseEther("0.001"),
  });

  console.log("Sent 0.001 ETH. Tx:", tx.hash);
  await tx.wait();
  console.log("Confirmed.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
