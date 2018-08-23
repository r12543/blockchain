const Web3 = require("web3");
const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
const fs = require("fs");
const solc = require("solc");

// compile the contract
function compileContract() {
  let code = fs.readFileSync("voting.sol").toString();
  let compiledCode = solc.compile(code);

  return compiledCode;
}

// deploy the contract
function deployContract() {
  let compiledCode = compileContract();
  let abiDefinition = JSON.parse(compiledCode.contracts[":Voting"].interface);
  let VotingContract = web3.eth.contract(abiDefinition);
  let byteCode = compiledCode.contracts[":Voting"].bytecode;
  let deployedContract = VotingContract.new(["Rama", "Nick", "Jose"], {
    data: byteCode,
    from: web3.eth.accounts[0],
    gas: 4700000
  });
  return deployedContract.address;

  //   let contractInstance = VotingContract.at(deployedContract.address);
}
