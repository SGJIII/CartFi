// SPDX-License-Identifier: MIT

pragma solidity >0.6.0;

interface USDC {
    function transfer(address recipient, uint256 amount) external returns (bool);
    function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);
    function balanceOf(address account) external view returns (uint256);
    function approve(address spender, uint256 amount) external returns (bool);
    function allowance(address owner, address spender) external view returns (uint256);
}

contract transferTest {
    USDC public USDc;
    address public owner;
    mapping(address => uint256) public balanceOf;

    constructor() public {
        USDc = USDC(0x2058A9D7613eEE744279e3856Ef0eAda5FCbaA7e);
        owner = msg.sender;
    }

    function depositTokens(uint $USDC) public {
        USDc.transferFrom(msg.sender, address(this), $USDC * 10 ** 6);
        balanceOf[msg.sender] += $USDC * 10 ** 6;
    }

    //unstake (customer can withdraw)
    function unstakeTokens() public {
        uint256 balance = balanceOf[msg.sender];

        require (balance > 0, "balance cannot be 0");
        USDc.transfer(msg.sender, balance);
        balanceOf[msg.sender] = 0;
    }
}