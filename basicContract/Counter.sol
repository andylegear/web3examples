pragma solidity ^0.8.0;

contract Counter {
    string public contractName;
    uint public counter;

    constructor(string memory name) {
        contractName = name;
        counter = 0;
    }

    function incrementCounter() public {
        counter++;
    }

    function decrementCounter() public {
        counter--;
    }
}