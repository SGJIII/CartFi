pragma solidity >0.6.0;

import "./USDC.sol";

contract Bank {
    string public name = "Bank";
    USDC public usdc;
    address public owner;

constructor(USDC _usdc) public {
    usdc = _usdc;
}
}