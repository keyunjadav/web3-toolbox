# Web3 Toolbox (JS + Python)
A small toolbox to send ETH and read contracts using Ethers.js and web3.py.

## Setup (JS)
```bash
npm install
cp .env.example .env
# fill RPC_URL, PRIVATE_KEY, TO_ADDRESS, CONTRACT_ADDRESS
npm run send:eth
npm run read:contract
```

## Setup (Python)
```bash
python -m venv venv && source venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
# fill .env values
python py/send_eth.py
```
