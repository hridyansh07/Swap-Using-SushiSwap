pragma solidity ^0.7.4;

import "./ERC20.sol";
import"./ERC20Detailed.sol";

contract TestnetUSDT is ERC20 , ERC20Detailed {
    constructor() public ERC20Detailed("TestnetUSDT", "USDT" , 18)
     {}   

    function mint(address to , uint256 value ) public returns(bool)
    {
        _mint(to , value);
        return true;
    }

}