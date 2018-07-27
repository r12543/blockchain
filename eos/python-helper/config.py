API_ENUM = {
    # Chain endpoints
    "GET_INFO": "/get_info",
    "GET_BLOCK": "/get_block",
    "GET_TABLE_ROWS": "/get_table_rows",
    "GET_ACCOUNT": "/get_account",
    "GET_CODE": "/get_code",

    # Push ENUMs
    "PUSH_BLOCK": "/push_block",
    "PUSH_TRANSACTION": "/push_transaction",
    "PUSH_TRANSACTIONS": "/push_transactions",

    # History
    "GET_TRANSACTION": "/get_transaction",
    "GET_ACTIONS": "/get_actions"
}

CHAIN_URL = "http://0.0.0.0:7777"
WALLET_URL = "http://0.0.0.0:5555"

CHAIN_API = "/v1/chain"
WALLET_API = "/v1/wallet"
