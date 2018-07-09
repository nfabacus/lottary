pragma solidity ^0.4.17;

contract Lottery {
    address public manager;
    address[] public players;
    
    constructor() public {
        manager = msg.sender;  //msg is a global object, available without declaration in any functions in contract
    }
    
    function getPlayers() public view returns (address[]) {
        return players;
    }
    
    function enter() public payable {
        require(msg.value > .01 ether);  //if the condition in require does not meet, returns out of the function. 
        // msg.value is the amount of money the sender is sending.
        // ?? ether will automatically convert into wei.
        players.push(msg.sender);
    }
    
    function random() public view returns(uint) { //not real random number. solidity cannot generate real random number...?
        return uint(keccak256(block.difficulty, now, players));
    }
    
    function pickWinner() public {
        uint index = random() % players.length;
        players[index].transfer(this.balance);
        //players[index] is the address of the selected player.
        //this (this instance of the contract). this.balance is the balance in the contract.
        //transfer(amount) will send the money to the player.
        
    }
}