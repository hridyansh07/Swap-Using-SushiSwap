// SPDX-License-Identifier: J-J-J-JENGA!!!
pragma solidity ^0.7.4;

import "./interfaces/IUniswapV2Factory.sol";
import "./interfaces/IUniswapV2Router02.sol";
import "./interfaces/IERC20.sol";
import "./Utils/Owned.sol";
import "./libraries/SafeMath.sol";


contract Exchange is Owned {

using SafeMath for uint256;

IUniswapV2Factory private  SushiSwapFactory;
IUniswapV2Router02 private SushiSwapRouter;
address public Token1;
address public Token2;

// BSC TESTNET FACTORY : 0xc35DADB65012eC5796536bD9864eD8773aBc74C4
// BSC TESTNET ROUTER : 0x1b02dA8Cb0d097eB8D57A175b88c7D8b47997506

    constructor(
    address SushiSwapFactoryAddress , 
    address SushiSwapRouterAddress,
    address Token1Address,
    address Token2Address
    )
    {
        Token1 = Token1Address;
        Token2 = Token2Address;
        SushiSwapFactory = IUniswapV2Factory(SushiSwapFactoryAddress);
        SushiSwapRouter = IUniswapV2Router02(SushiSwapRouterAddress);
        IERC20(Token1Address).approve(SushiSwapRouterAddress , uint(-1));
        IERC20(Token2Address).approve(SushiSwapRouterAddress , uint(-1));
    }


    function initialize () external ownerOnly{
        SushiSwapFactory.createPair(Token1 , Token2);
    }

    function addLiquidity(uint256 Token1Value, uint256 Token2Value) public {
        address pair = SushiSwapFactory.getPair(Token1 , Token2);
        require(pair != address(0) , "Pair Is Not Initialized");
        uint256 initialBalanceToken1 = IERC20(Token1).balanceOf(address(this));
        uint256 initialBalanceToken2 = IERC20(Token2).balanceOf(address(this));
        IERC20(Token1).transferFrom(msg.sender , address(this) , Token1Value);
        IERC20(Token2).transferFrom(msg.sender , address(this) , Token2Value);
        uint256 CurrentBalance1 = IERC20(Token1).balanceOf(address(this));
        uint256 CurrentBalance2 = IERC20(Token2).balanceOf(address(this));
        uint256 balanceToken1 = CurrentBalance1.sub(initialBalanceToken1);
        uint256 balanceToken2 = CurrentBalance2.sub(initialBalanceToken2);  
        SushiSwapRouter.addLiquidity(
            Token1,
            Token2, 
            balanceToken1,
            balanceToken2,
            0,
            0,
            msg.sender,
            block.timestamp
        );
    }

    function getAmountsOutToken2(uint256 Token1In) internal view returns(uint256) {
        address[] memory path = new address[](2);
        path[0] = Token1;
        path[1] = Token2;
        (uint256[] memory amounts) = SushiSwapRouter.getAmountsOut(Token1In , path);
        return amounts[1];
    }
    
    function getAmountsOutToken1(uint256 Token2In) internal view returns(uint256)
    {
        address[] memory path = new address[](2);
        path[0] = Token2;
        path[1] = Token1;
        (uint256[] memory amounts) = SushiSwapRouter.getAmountsOut(Token2In , path);
        return amounts[1];
    }
    
    function SwapToken1(uint256 valueToken1) public{
        require(valueToken1 != uint256(0) , "INVALID INPUT");
        IERC20(Token1).transferFrom(msg.sender , address(this) , valueToken1);
        uint256 ExpectedToken2Amount = getAmountsOutToken2(valueToken1);
        address[] memory path = new address[](2);
        path[0] = Token1;
        path[1] = Token2;
        SushiSwapRouter.swapExactTokensForTokens(valueToken1 , ExpectedToken2Amount , path , address(this) , block.timestamp);
        uint256 Balance = IERC20(Token2).balanceOf(address(this));
        IERC20(Token2).transfer(msg.sender , Balance);
    }
    
    function SwapToken2(uint256 valueToken2) public{
        require(valueToken2 != uint256(0) , "INVALID INPUT");
        IERC20(Token2).transferFrom(msg.sender , address(this) , valueToken2);
        uint256 ExpectedToken1Amount = getAmountsOutToken1(valueToken2);
        address[] memory path = new address[](2);
        path[0] = Token2; 
        path[1] = Token1;
        SushiSwapRouter.swapExactTokensForTokens(valueToken2 , ExpectedToken1Amount , path , address(this) , block.timestamp);
        uint256 Balance = IERC20(Token1).balanceOf(address(this));
        IERC20(Token1).transfer(msg.sender , Balance);
    }


    // function SwapToken1ForToken2(uint256 Token1Value) public {
    //     require(Token1Value != uint256(0) , "INVALID INPUT");
    //     uint256 initialBalance = IERC20(Token1).balanceOf(address(this));
    //     IERC20(Token1).transferFrom(msg.sender , address(this) , Token1Value);
    //     uint256 afterTransferBalance = IERC20(Token1).balanceOf(address(this));
    //     uint256 Token1Balance = afterTransferBalance.sub(initialBalance);
    //     uint256 initialBalanceToken2 = IERC20(Token2).balanceOf(address(this));
    //     uint256 ExpectedToken2Amount = getAmountsOutToken2(Token1Balance);
    //     address[] memory path = new address[](2);
    //     path[0] = Token1;
    //     path[1] = Token2;
    //     SushiSwapRouter.swapExactTokensForTokens(Token1Balance , ExpectedToken2Amount , path , address(this) , block.timestamp);
    //     uint256 CurrentBalance= IERC20(Token2).balanceOf(address(this));
    //     uint256 SwappedTokens = CurrentBalance.sub(initialBalanceToken2);
    //     IERC20(Token2).transfer(msg.sender, SwappedTokens);
    // }

    // function SwapToken2ForToken1(uint256 Token2Value) public {
    //     require(Token2Value != uint256(0) , "INVALID INPUT");
    //     uint256 initialBalance = IERC20(Token2).balanceOf(address(this));
    //     IERC20(Token2).transferFrom(msg.sender , address(this) , Token2Value);
    //     uint256 afterTransferBalance = IERC20(Token2).balanceOf(address(this));
    //     uint256 Token2Balance = afterTransferBalance.sub(initialBalance);
    //     uint256 initialBalanceToken1 = IERC20(Token1).balanceOf(address(this));
    //     uint256 ExpectedToken1Amount = getAmountsOutToken1(Token2Balance);
    //     address[] memory path = new address[](2);
    //     path[0] = Token2;
    //     path[1] = Token1;
    //     SushiSwapRouter.swapExactTokensForTokens(Token2Balance , ExpectedToken1Amount , path , address(this) , block.timestamp);
    //     uint256 CurrentBalance= IERC20(Token1).balanceOf(address(this));
    //     uint256 SwappedTokens = CurrentBalance.sub(initialBalanceToken1);
    //     IERC20(Token1).transfer(msg.sender, SwappedTokens);
    // }

    function withdrawFunds() external ownerOnly{
        uint256 balanceToken1 = IERC20(Token1).balanceOf(address(this));
        IERC20(Token1).transfer(owner , balanceToken1);
        uint256 balanceToken2 = IERC20(Token2).balanceOf(address(this));
        IERC20(Token2).transfer(owner , balanceToken2);
    }

}
