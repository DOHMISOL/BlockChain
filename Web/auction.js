
// var web3 = new Web3();
var web3 = new Web3('ws://localhost:7545');

// web3.setProvider(new web3.providers.HttpProvider("http://localhost:7545"));

var bidder;
var accounts;
//=   web3.eth.getAccounts(); // web3.eth.accounts[0];
web3.eth.getAccounts().then(function(acc){
  // bidder=acc;
  accounts = acc;
  console.log(acc)
  web3.eth.defaultAccount = acc[0]
  bidder = acc[0]

  auctionContract.methods.auction_end().call().then( (result)=>{
    const auctionEndUnixTime = parseInt(result);
    const auctionEndHMS = unixTimeToHMS(auctionEndUnixTime);
    document.getElementById("auction_end").innerHTML = auctionEndHMS;
  });

  auctionContract.methods.highestBidder().call().then( (result)=>{
document.getElementById("HighestBidder").innerHTML=result;
});

auctionContract.methods.highestBid().call().then( (result)=>{
console.log("highest bid info: ", result)
var bidEther = web3.utils.fromWei(web3.utils.toBN(result), 'ether');
document.getElementById("HighestBid").innerHTML=bidEther;

});
  auctionContract.methods.STATE().call().then( (result)=>{
document.getElementById("STATE").innerHTML=result;

});

  auctionContract.methods.Mycar().call().then( (result)=>{


    document.getElementById("car_brand").innerHTML=result[0];
    document.getElementById("registration_number").innerHTML=result[1];

});

auctionContract.methods.bids(bidder).call().then( (result) => {

    var bidEther = web3.utils.fromWei(web3.utils.toBN(result), 'ether');
    document.getElementById("MyBid").innerHTML=bidEther;

    console.log(bidder);

});

document.getElementById("loadImageButton").addEventListener("click", function () {
    const imageUrl = "http://hu5911.s21.hdweb.co.kr/data/file/car/thumb-988212158_Rzu2WnVk_7832b4b42c31ec253f84416c7434def20901dd8d_820x615.jpg"; // 여기에 이미지 파일의 실제 경로를 입력하세요
    const imageElement = document.getElementById("uploadedImage");

    if (imageUrl) {
        imageElement.src = imageUrl;
    }
});




});
// web3.eth.defaultAccount = bidder;
var auctionContract =  new web3.eth.Contract(
   [
  {
    "constant": true,
    "inputs": [],
    "name": "Mycar",
    "outputs": [
      {
        "name": "Brand",
        "type": "string"
      },
      {
        "name": "Rnumber",
        "type": "string"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "get_owner",
    "outputs": [
      {
        "name": "",
        "type": "address"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [],
    "name": "bid",
    "outputs": [
      {
        "name": "",
        "type": "bool"
      }
    ],
    "payable": true,
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [],
    "name": "cancel_auction",
    "outputs": [
      {
        "name": "",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [],
    "name": "withdraw",
    "outputs": [
      {
        "name": "",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "",
        "type": "address"
      }
    ],
    "name": "bids",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "auction_start",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "highestBidder",
    "outputs": [
      {
        "name": "",
        "type": "address"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [],
    "name": "destruct_auction",
    "outputs": [
      {
        "name": "",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "auction_end",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "STATE",
    "outputs": [
      {
        "name": "",
        "type": "uint8"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "highestBid",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "name": "_biddingTime",
        "type": "uint256"
      },
      {
        "name": "_owner",
        "type": "address"
      },
      {
        "name": "_brand",
        "type": "string"
      },
      {
        "name": "_Rnumber",
        "type": "string"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "name": "highestBidder",
        "type": "address"
      },
      {
        "indexed": false,
        "name": "highestBid",
        "type": "uint256"
      }
    ],
    "name": "BidEvent",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "name": "withdrawer",
        "type": "address"
      },
      {
        "indexed": false,
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "WithdrawalEvent",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "name": "message",
        "type": "uint256"
      },
      {
        "indexed": false,
        "name": "time",
        "type": "uint256"
      }
    ],
    "name": "CanceledEvent",
    "type": "event"
  }
]
  );
var contractAddress = '0x53C72B93DF096e0f04C6Aa478b327F6954610aF7';
// var auction = auctionContract.at(contractAddress);
auctionContract.options.address = '0x53C72B93DF096e0f04C6Aa478b327F6954610aF7';




function bid() {
  var getAccount = document.getElementById('getAccount').value;
  var mybid = document.getElementById('value').value;

  for (var i = 0; i < accounts.length; i++) {
    if (getAccount === accounts[i]) {
      auctionContract.methods.bid().send({from: `${getAccount}`, value: web3.utils.toWei(mybid, "ether"), gas: 200000})
        .then((result) => {
          console.log(result);
          document.getElementById("biding_status").innerHTML = "Successful bid, transaction ID: " + result.transactionHash;
          document.getElementById("HighestBidder").innerHTML = `${getAccount}`;
        })
        .catch((error) => {
          console.error(error);
          document.getElementById("biding_status").innerHTML = "Error during bid";
        });
      return;
    }
  }

  console.log("Account not found in the allowed list, bid not allowed");
  document.getElementById("biding_status").innerHTML = "Account not found in the allowed list, bid not allowed";
}




function init(){
 // setTimeout(() => alert("아무런 일도 일어나지 않습니다."), 3000);


}

var auction_owner=null;
auctionContract.methods.get_owner().call().then((result)=>{

      auction_owner=result;
     if(bidder!=auction_owner)
     $("#auction_owner_operations").hide();

})
  // auctionContract.methods.get_owner(function(error, result){
	 //  if (!error){
		//   auction_owner=result;
	 //   if(bidder!=auction_owner)
	 //   $("#auction_owner_operations").hide();
	 //  }

// }
// );


function cancel_auction(){
  // .auction_end().call().
// auctionContract.methods.cancel_auction().call().then( (result)=>{
//   console.log(result)
// });
auctionContract.methods.cancel_auction().send({from: '0x53C72B93DF096e0f04C6Aa478b327F6954610aF7', gas: 200000}).then((res)=>{
// auctionContract.methods.cancel_auction().call({from: '0x3211BA2b204cdb231EF5616ec3cAd26043b71394'}).then((res)=>{
console.log(res);
});
}



function Destruct_auction(){
// auctionContract.methods.destruct_auction().call().then( (result)=>{
//   console.log(result) //The auction is still open when now() time < auction_end time
// });
auctionContract.methods.destruct_auction().send({from: '0x53C72B93DF096e0f04C6Aa478b327F6954610aF7', gas: 200000}).then((res)=>{
console.log(res);
});

}

function unixTimeToHMS(unixTime) {
  const date = new Date(unixTime * 1000); // Convert Unix time to milliseconds
  const hours = date.getUTCHours().toString().padStart(2, '0');
  const minutes = date.getUTCMinutes().toString().padStart(2, '0');
  const seconds = date.getUTCSeconds().toString().padStart(2, '0');
  return `${hours}시${minutes}분${seconds}초`;
}


auctionContract.events.BidEvent(/*{highestBidder:"A",highestBid:"888"},*/function(error, event){
      console.log(event);
  })
  .on("connected", function(subscriptionId){
      console.log(subscriptionId);
  })
  .on('data', function(event){
      console.log(event); // same results as the optional callback above
      $("#eventslog").html(event.returnValues.highestBidder + ' has bidden(' + event.returnValues.highestBid + ' wei)');

  })
  .on('changed', function(event){
      // remove event from local database
      console.log(event);
  })
  // var BidE
/*filter.get(callback): Returns all of the log entries that fit the filter.
filter.watch(callback): Watches for state changes that fit the filter and calls the callback. See this note for details.*/
// var BidEvent = auctionContract.events.BidEvent(); // var BidEvent = auction.BidEvent(({}, {fromBlock: 0, toBlock: 'latest'});


//     BidEvent.watch(function(error, result){
//             if (!error)
//                 {
//                     $("#eventslog").html(result.args.highestBidder + ' has bidden(' + result.args.highestBid + ' wei)');
//                 } else {

//                     console.log(error);
//                 }
//         });

//  auctionContract.events.allEvents({fromBlock: 0}, function(error, event){ console.log(event); })
// .on("connected", function(subscriptionId){
//     console.log(subscriptionId);
// })
// .on('data', function(event){
//     console.log(event); // same results as the optional callback above
// })
// .on('changed', function(event){
//     // remove event from local database
// })
// .on('error', function(error, receipt) { // If the transaction was rejected by the network with a receipt, the second parameter will be the receipt.

// });


// var subscription = web3.eth.subscribe('CanceledEvent', function(error, result){
//     if (!error)
//         console.log(result);
// })
// .on("data", function(transaction){
//     console.log(transaction);
// });

// unsubscribes the subscription
// subscription.unsubscribe(function(error, success){
//     if(success)
//         console.log('Successfully unsubscribed!');
// });


 auctionContract.events.CanceledEvent( function(error, event){
  console.log(event);
  })
  .on("connected", function(subscriptionId){
      console.log(subscriptionId);
  })
  .on('data', function(event){
      console.log(event); // same results as the optional callback above
   $("#eventslog").html(event.returnValues.message+' at '+event.returnValues.time);
  })
  .on('changed', function(event){
      // remove event from local database
  })
  .on('error', function(error, receipt){ // If the transaction was rejected by the network with a receipt, the second parameter will be the receipt.

  });

 // var CanceledEvent = auctionContract.events.CanceledEvent();

 //    CanceledEvent.watch(function(error, result){
 //            if (!error)
 //                {
	// 				                    console.log(result);

 //                    $("#eventslog").html(result.args.message+' at '+result.args.time);
 //                } else {

 //                    console.log(error);
 //                }
 //        });


// const filter = web3.eth.subscribe({
//   fromBlock: 0,
//   toBlock: 'latest',
//   address: contractAddress,
//   topics: [web3.utils.sha3('BidEvent(address,uint256)')]
// }, function(error, result){
//    if (!error)
//   console.log(result);
// })

// filter.get((error, result) => {
// 	   if (!error)
//   console.log(result);
//   //console.log(result[0].data);

// })
