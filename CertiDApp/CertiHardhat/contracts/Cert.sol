// SPDX-License-Identifier: GPL-3.0

pragma solidity 0.8.28;

contract Cert{
    struct Certificate{
        string name;
        string course;
        string grade;
        string date;
    }

    address admin;
    event Issued(string indexed course, uint256 indexed id, string grade);
 
    constructor(){
        admin = msg.sender;
    }

    modifier onlyAdmin(){
        require(msg.sender==admin,"Unauthorized Access");
        _;
    }

    mapping (uint256 => Certificate) public Certificates;

    function issue(uint256 _id,
        string memory name,
        string memory course,
        string memory grade,
        string memory date
    ) public onlyAdmin{
        Certificates[_id]= ( Certificate(name,course,grade,date));
        emit Issued(course,_id,grade); 
    }
    
}

