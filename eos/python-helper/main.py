from requests import request
import json

BASE_URL = "http://127.0.0.1:8888/v1/chain/"


def print_response(text):
    print(json.dumps(json.loads(text), indent=4))

class Client:
    # def __init__(self):
    #     base_url = "http://127.0.0.1:8888/v1/chain/"

    def get_info(self):
        url = BASE_URL + "get_info"
        response = request("POST", url)
        print_response(response.text)

    def get_account(self, account_name):
        url = BASE_URL + "get_account"
        payload = "{\"account_name\": \"" + account_name + "\"}"
        response = request("POST", url, data=payload)
        print_response(response.text)

    def get_block(self, block_num_or_id):
        url = BASE_URL + "get_block"
        payload = "{\"block_num_or_id\":" + str(block_num_or_id) + "}"
        response = request("POST", url, data=payload)
        print_response(response.text)


c = Client()
# c.get_info()
c.get_account("eosio")
# c.get_block(1)
