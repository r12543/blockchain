# blockchain
all dapps development on different blockchains

# Setup flow
Setup process
----------------------------------------------------------------------------
Step #1 – Start the nodeos
To print contract's output to console by default add: --contracts-console

`nodeos -e -p eosio --plugin eosio::wallet_api_plugin --plugin eosio::chain_api_plugin --plugin eosio::history_api_plugin --contracts-console`

----------------------------------------------------------------------------
Step #2 – Create a Wallet
It will store our keys which we’ll use when we’re signing transactions

* Create new wallet with the name "oasis"
`cleos wallet create -n oasis`

* Generate two pair of keys (use the command twice)
`cleos create key`

* Import the generated private keys in the wallet(you need to specify the wallet at the end)
* {private_key_1} - This will be the OwnerKey
* {private_key_2} - This will be the ActiveKey
`cleos wallet import {private_key_1} -n oasis `
`cleos wallet import {private_key_2} -n oasis`

* Add the private key of the "eosio" account into your wallet
* Note: With the latest version of EOSIO the private key is automatically added to your wallet
`cleos wallet import 5KQwrPbwdL6PhXujxW37FSSQZ1JiwsST4cqQzDeyXtP79zkvFD3 -n oasis`

Note: Don’t forget to save your keys and wallet password

----------------------------------------------------------------------------
Step #3 – Create an Account
The EOS.IO smart contracts run on an account. So an account is required to transfer or otherwise push a transaction to the blockchain. Let’s name our account “anorak“. Sounds familiar?

* Create the account using the public keys
`cleos create account eosio anorak {public_OwnerKey} {public_ActiveKey}`

* "eosio" is the name of the account who will create the new one
* "anorak" is the name of the new account

----------------------------------------------------------------------------
Step #4 – Start writing contract

* Add cpp and hpp files

----------------------------------------------------------------------------
Step #5 – Deploy contratcs

* generate wast file
`eosiocpp -o Players.wast Players.cpp`
* generate abi file
`eosiocpp -g Players.abi Players.cpp`
* deploy contract
`cleos set contract {account} {path_to_contract_folder} {path_to_.wast_file} {path_to_.abi_file}`

----------------------------------------------------------------------------
Step #6 – test smart contratcs

`cleos push action {account} {action_name} '{data}' -p {account}@active`
ex: `cleos push action anorak add '["anorak","art3mis"]' -p anorak@active`


