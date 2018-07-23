# generate wast file
eosiocpp -o ./contracts/lottery/Lottery.wast ./contracts/lottery/Lottery.cpp

# generate abi file
eosiocpp -g ./contracts/lottery/Lottery.abi ./contracts/lottery/Lottery.cpp