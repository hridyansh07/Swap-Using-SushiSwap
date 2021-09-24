// SPDX-License-Identifier: J-J-J-JENGA!!!
pragma solidity ^0.7.4;


import "../interfaces/IERC20.sol";

abstract contract ERC20Detailed is IERC20{
    string private _name;
    string private _symbol;
    uint8 private _decimals;

    constructor (string memory name, string memory symbol, uint8 decimals)  {
        _name = name;
        _symbol = symbol;
        _decimals = decimals;
    }

    /**
     * @return the name of the token.
     */
    function name() public override view returns (string memory) {
        return _name;
    }

    /**
     * @return the symbol of the token.
     */
    function symbol() public override view returns (string memory) {
        return _symbol;
    }

    /**
     * @return the number of decimals of the token.
     */
    function decimals() public override view returns (uint8) {
        return _decimals;
    }
}