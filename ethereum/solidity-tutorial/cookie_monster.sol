/**
* Explanation
*
* `address` --> This is the special type for storing wallets’ or other contracts’ addresses.
* `public` --> When you add public modifier to the property,
*              it automatically generates the getter for that property,
*              avoiding setting the value directly. In this way, public properties are read-only.
*
* `msg` --> It contains five properties
*           msg.data -->  contains complete calldata
*           msg.sender -->  tells us about the address, which run the transaction
*           msg.value -->  is the amount of WEI, sent with the message
*           msg.gas -->  indicates the remaining gas
*           msg.sig -->  shows the first four bytes of the calldata
*
* `Wei` --> It is the smallest denomination in the Ethereum. 
*           It’s like a penny for the pound. ETH costs 10¹⁸ wei.
* `external` --> This modifier tells that this function can be called only outside of the smart contract.
* `internal` --> can be called only inside of the smart contract.
* `struct` --> to define the models/tables
*/

pragma solidity ^0.4.24;

contract CryptoCookieMonsters {
    address public owner; // public properties are read only
    uint256 counter = 0;
    struct CookieMonster {
        string name;
        uint256 id;
        uint16 level;
    }
    CookieMonster[] public monsters;

    constructor() public {  // constructor to assign contract variables
        owner = msg.sender;
    }

    function createCookieMonster() external {
        CookieMonster memory newMonster = CookieMonster("Test Monster", counter++, 1);
        monsters.push(newMonster);
    }
}