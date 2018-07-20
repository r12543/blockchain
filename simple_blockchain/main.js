const cryptojs = require("crypto");
const secret = "qwerty12345";

class Transaction {
    constructor(fromAddress, toAddress, amount) {
        this.fromAddress = fromAddress;
        this.toAddress = toAddress;
        this.amount = amount;
    }
}

class Block {
    constructor(timestamp, transactions, previousHash = "") {
        this.timestamp = timestamp;
        this.transactions = transactions;
        this.previousHash = previousHash;
        this.hash = this.calculateHash();
        this.nonce = 0;
    }

    calculateHash() {
        return cryptojs.createHmac(
            'sha256', secret
        )
        .update(this.index +
                this.previousHash +
                this.timestamp +
                JSON.stringify(this.data) +
                this.nonce
        )
        .digest("hex");
    }

    mineBlock(difficulty) {
        while(this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")) {
            this.nonce++;
            this.hash = this.calculateHash();
        }

        console.log("Block mined: " + this.hash);
    }
}


class Blockchain {
    constructor() {
        this.chain = [this.createGenesisBlock()];
        this.difficulty = 2;
        this.pendingTransactions = [];
        this.miningReward = 100;
    }

    createGenesisBlock() {
        return new Block("01/01/2018", "Genesis Block", "0");
    }

    getLatestBlock() {
        return this.chain[this.chain.length - 1];
    }

    // addBlock(newBlock) {
    //     newBlock.previousHash = this.getLatestBlock().hash;
    //     newBlock.mineBlock(this.difficulty);
    //     this.chain.push(newBlock);
    // }

    minePendingTransaction(miningRewardAddress) {
        let block = new Block(Date.now(), this.pendingTransactions, this.getLatestBlock().hash);
        block.mineBlock(this.difficulty);

        console.log("Block successfully mined!");
        this.chain.push(block);

        this.pendingTransactions = [
            new Transaction(null, miningRewardAddress, this.miningReward)
        ];
    }

    createTransaction(transaction) {
        this.pendingTransactions.push(transaction);
    }

    getBalanceOfAddress(address) {
        let balance = 0;

        for(const block of this.chain) {
            for(const trans of block.transactions) {
                if(trans.fromAddress === address){
                    balance -= trans.amount;
                }

                if(trans.toAddress === address) {
                    balance += trans.amount;
                }
            }
        }
        return balance;
    }

    isChainValid() {
        for(let i=1; i<this.chain.length; i++) {
            const currentBlock = this.chain[i];
            const previousBlcok = this.chain[i-1];

            if(currentBlock.hash !== currentBlock.calculateHash()) {
                return false;
            }

            if(currentBlock.previousHash !== previousBlcok.hash) {
                return false;
            }
        }

        return true;
    }
}

let rajatCoin = new Blockchain();
rajatCoin.createTransaction(new Transaction('address1', 'address2', 100));
rajatCoin.createTransaction(new Transaction('address2', 'address1', 50));

console.log("\n Starting the miner...");
rajatCoin.minePendingTransaction("bhais-address");

console.log("\nBalance of bhai is", rajatCoin.getBalanceOfAddress("bhais-address"));

console.log("\n Starting the miner again...");
rajatCoin.minePendingTransaction("bhais-address");

console.log("\nBalance of bhai is", rajatCoin.getBalanceOfAddress("bhais-address"));

console.log("\n Starting the miner once again...");
rajatCoin.minePendingTransaction("bhais-address");

console.log("\nBalance of bhai is", rajatCoin.getBalanceOfAddress("bhais-address"));
