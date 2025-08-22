import os
from web3 import Web3
from dotenv import load_dotenv

load_dotenv()

RPC_URL = os.getenv("RPC_URL")
PRIVATE_KEY = os.getenv("PRIVATE_KEY")
TO_ADDRESS = os.getenv("TO_ADDRESS")

if not all([RPC_URL, PRIVATE_KEY, TO_ADDRESS]):
    raise SystemExit("Missing RPC_URL, PRIVATE_KEY, or TO_ADDRESS in .env")

w3 = Web3(Web3.HTTPProvider(RPC_URL))
acct = w3.eth.account.from_key(PRIVATE_KEY)

nonce = w3.eth.get_transaction_count(acct.address)
tx = {
    "to": TO_ADDRESS,
    "value": w3.to_wei(0.001, "ether"),
    "gas": 21000,
    "gasPrice": w3.to_wei("2", "gwei"),
    "nonce": nonce,
    "chainId": w3.eth.chain_id,
}

signed = w3.eth.account.sign_transaction(tx, PRIVATE_KEY)
tx_hash = w3.eth.send_raw_transaction(signed.rawTransaction)
print("Sent 0.001 ETH. Tx:", tx_hash.hex())
