from requests import request
import json
from config import API_ENUM, CHAIN_URL, WALLET_URL, CHAIN_API, WALLET_API


def print_response(response):
    """
    Prints response response in pretty form
        :param response: response json
    """
    print(json.dumps(json.loads(response), indent=4))


class Client:
    def __init__(self):
        self.base_url = CHAIN_URL + CHAIN_API

    def get_info(self):
        """
        Returns an object containing various details about the blockchain.
            :param self:
        """
        url = self.base_url + API_ENUM.get('GET_INFO')
        response = request("POST", url)
        print_response(response.text)

    def get_account(self, account_name):
        """
        Returns an object containing various details about a specific account on the blockchain.
            :param self:
            :param account_name: name of account in blockchain
        """
        url = self.base_url + API_ENUM.get('GET_ACCOUNT')
        payload = {
            "account_name": account_name
        }
        response = request("POST", url, data=json.dumps(payload))
        print_response(response.text)

    def get_block(self, block_num_or_id):
        """
        Returns an object containing various details about a specific block on the blockchain.
            :param self:
            :param block_num_or_id: id or block number
        """
        url = self.base_url + API_ENUM.get('GET_BLOCK')
        payload = {
            "block_num_or_id": str(block_num_or_id)
        }
        response = request("POST", url, data=json.dumps(payload))
        print_response(response.text)


c = Client()
# c.get_info()
# c.get_account("eosio")
# c.get_block(1)
