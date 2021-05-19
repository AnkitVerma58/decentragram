pragma solidity ^0.5.0;

contract Decentragram {
  string public name = "Decentragram";


    uint public imageCount=0;
    mapping(uint => Image) public images;

    struct Image{
      uint id;
      string hash;
      string description;
      uint tipAccount;
      address payable author;
    }
    event ImagCreate(
      uint id,
      string hash,
      string description,
      uint tipAccount,
      address payable author
    );

    function uploadImage(string memory _imagHash,string  memory _discription)  public {

        require(bytes(_imagHash).length >0);
    require(bytes(_discription).length>0);
  
    require(msg.sender != address(0*0));
      imageCount ++;
      images[imageCount]=Image(imageCount,_imagHash,_discription,0, msg.sender);

      emit ImagCreate(imageCount,_imagHash,_discription,0, msg.sender);

    }
    function tipimageOnner(uint _id) public payable {

      require(_id>0 && _id<=imageCount,"out of the block");
      Image memory _image=images[_id];
      address payable _author=_image.author;
      _author.transfer(msg.value);
      _image.tipAccount=_image.tipAccount + msg.value;
      images[_id] = _image;
    }
}