// SPDX-License-Identifier: J-J-J-JENGA!!!
pragma solidity ^0.7.4;

import "./ERC20.sol";
import"./ERC20Detailed.sol";

contract TestnetDai is ERC20 , ERC20Detailed {
    constructor() public ERC20Detailed("TestnetDai", "DAI" , 18)
     {}   

    function mint(address to , uint256 value ) public returns(bool)
    {
        _mint(to , value);
        return true;
    }

}