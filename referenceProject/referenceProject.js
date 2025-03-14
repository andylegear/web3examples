// create a new web3 instance connected to the Sepolia test network on https://rpc2.sepolia.org
//const web3 = new Web3("https://rpc-sepolia.rockx.com");
// Or HETH
const web3 = new Web3("https://holesky.drpc.org");
const tokenAddress = "0xf349aebe6ad110f28d133c8146cea2ac6c9fca86";

  
const IERC20_ABI = [
    {
        "constant": true,
        "inputs": [],
        "name": "totalSupply",
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
        "inputs": [
            {
                "name": "account",
                "type": "address"
            }
        ],
        "name": "balanceOf",
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
        "constant": false,
        "inputs": [
            {
                "name": "recipient",
                "type": "address"
            },
            {
                "name": "amount",
                "type": "uint256"
            }
        ],
        "name": "transfer",
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
                "name": "owner",
                "type": "address"
            },
            {
                "name": "spender",
                "type": "address"
            }
        ],
        "name": "allowance",
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
        "constant": false,
        "inputs": [
            {
                "name": "spender",
                "type": "address"
            },
            {
                "name": "amount",
                "type": "uint256"
            }
        ],
        "name": "approve",
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
        "inputs": [
            {
                "name": "sender",
                "type": "address"
            },
            {
                "name": "recipient",
                "type": "address"
            },
            {
                "name": "amount",
                "type": "uint256"
            }
        ],
        "name": "transferFrom",
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
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "name": "from",
                "type": "address"
            },
            {
                "indexed": true,
                "name": "to",
                "type": "address"
            },
            {
                "indexed": false,
                "name": "value",
                "type": "uint256"
            }
        ],
        "name": "Transfer",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "name": "owner",
                "type": "address"
            },
            {
                "indexed": true,
                "name": "spender",
                "type": "address"
            },
            {
                "indexed": false,
                "name": "value",
                "type": "uint256"
            }
        ],
        "name": "Approval",
        "type": "event"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "name",
        "outputs": [
            {
                "name": "",
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
        "name": "symbol",
        "outputs": [
            {
                "name": "",
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
        "name": "decimals",
        "outputs": [
            {
                "name": "",
                "type": "uint8"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    }
];



        // when you click cryptoBalanceButton button, check the balance of the wallet
        $("#checkBalancesButton").click(function() {
            // get the wallet address from the input field
            // 0x8DC4bAC59E0a169419Eb8dB57920ADe558E47725
            const walletAddress = $("#walletAddressBalance").val();
            // check if the wallet address is valid
            if (web3.utils.isAddress(walletAddress)) {
                
                // get the balance of the wallet
                web3.eth.getBalance(walletAddress).then(function(balance) {                    
                    // convert the balance from wei to ether
                    const balanceInEther = web3.utils.fromWei(balance, "ether");
                    // display the balance
                    $("#cryptoBalance").html("<strong>Crypto Balance: " + balanceInEther + " ETH</strong>");

                        // create a new contract instance using the ERC20 ABI and the token address
                    const contract = new web3.eth.Contract(IERC20_ABI, tokenAddress);
                    // call the balanceOf function of the contract to get the token balance of the wallet
                    contract.methods.balanceOf(walletAddress).call().then(function(balance) {
                        // display the balance
                        $("#tokenBalance").html("<strong>Token Balance: " + balance+ "Ticket Tokens</strong>");
                        // NOTE: You can get a random token for testing from a dedicated token faucet here https://faucet.quicknode.com/ethereum/sepolia 
                    });

                    // NOTE: Compare your results for your wallet on the sepolia blockchain explorer https://sepolia.etherscan.io/
                    // NOTE: You can add Sepolia Crypto to your wallet using the one of the many faucets here https://faucetlink.to/sepolia

                });
            } else {
                // display an error message if the wallet address is invalid
                $("#errorMessage").text("Invalid wallet address");
                $("#errorModal").css("display", "block");
            }
        });

        // When the user clicks on <span> (x), close the modal
        $("#closeModal").click(function() {
            $("#errorModal").css("display", "none");
        });
  

function openTab(evt, tabName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";
}


$("#createWalletButton").click(function(){
         // alert if empty password
        var password = $("#password").val();
         if(password == ""){
            alert("Please enter a password for the Key Store");
            return;
        }
        // Create a new Web3 instance
        var web3 = new Web3();

        // Create a new wallet
        var wallet = web3.eth.accounts.create();
        // wallet address into the text area
        $("#walletAddress").val(wallet.address);
        $("#walletAddressBalance").val(wallet.address);

        // Display the private key
        $("#privateKey").val(wallet.privateKey);


        // Display the keystore file
        var keystore = web3.eth.accounts.encrypt(wallet.privateKey, password);
        $("#keystore").val(JSON.stringify(keystore));

    });


$("#downloadKeystore").click(function(){
        var keystore = $("#keystore").val();
        // alert if keystore is empty
        if(keystore == ""){
            alert("Please create a wallet first");
            return;
        }
        var blob = new Blob([keystore], {type: "text/plain;charset=utf-8"});
        var wallet = $("#walletAddress").val();
        saveAs(blob, wallet + ".json");
    });

function saveAs(blob, filename) {
    var url = URL.createObjectURL(blob);
    var a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
}


$("#loadWalletButton").click(function(){

    // return if no password is entered
    if ($("#passwordBuy").val() == ""){
        // show the modal with the error
        $("#errorMessage").text("Please enter a password");
        $("#errorModal").css("display", "block");
        return;
    }

    // load the contents of the file#
    var file = $("#keystoreFile")[0].files[0];
    // return if no file is selected
    if (!file){
            // show the modal with the error
            $("#errorMessage").text("Please select a file");
            $("#errorModal").css("display", "block");
        return;
    }

    var reader = new FileReader();
    reader.onload = function(e){
        var keystore = e.target.result;
        var password = $("#passwordBuy").val();
        try {
            // decrypt the wallet
            var wallet = web3.eth.accounts.decrypt(keystore, password);
            // display the wallet address
            $("#walletAddressBuy").val(wallet.address);
            // display the private key
            $("#privateKeyBuy").val(wallet.privateKey);
        } catch (error) {
            // show the modal with the error
            $("#errorMessage").text(error.message);
            $("#errorModal").css("display", "block");

        }
    };
    reader.readAsText(file);


});


$("#buyTokensButton").click(function(){
    // increment the value in "counter" variable of the contract by sending a signed transaction using the private key
    var privateKey = $("#privateKeyBuy").val();

    // alert if no private key is entered
    if (privateKey == ""){
        // show the modal with the error
        $("#errorMessage").text("Please enter a private key");
        $("#errorModal").css("display", "block");
        return;
    }

    var wallet = web3.eth.accounts.privateKeyToAccount(privateKey);
    // contract creator 0x8DC4bAC59E0a169419Eb8dB57920ADe558E47725
    var contractAddress = tokenAddress;
    var contract = new web3.eth.Contract(ABI, contractAddress);
    var transaction = contract.methods.buyToken();
    var encodedABI = transaction.encodeABI();
    var amount = $("#amountToPay").val();
    var tx = {
        from: wallet.address,
        to: contractAddress,
        gas: 2000000,
        data: encodedABI,
        value: web3.utils.toWei(amount, 'ether') // Add the amount to the payable transaction
    };

    // show the modal saying that the transaction is in progress
    $("#errorMessage").text("Transaction in progress.  This could take 30s");
    $("#errorModal").css("display", "block");

    web3.eth.accounts.signTransaction(tx, privateKey).then(function(signedTx){
        web3.eth.sendSignedTransaction(signedTx.rawTransaction).on('receipt', function(receipt){
            $("#transactionRequest").val(JSON.stringify(tx));
            $("#transactionResult").val(JSON.stringify(receipt));

            // dismiss the modal
            $("#errorModal").css("display", "block");
        });
    });

});

$("#loadWalletButtonVendor").click(function(){

    // return if no password is entered
    if ($("#passwordVendor").val() == ""){
        // show the modal with the error
        $("#errorMessage").text("Please enter a password");
        $("#errorModal").css("display", "block");
        return;
    }

    // load the contents of the file#
    var file = $("#keystoreFileVendor")[0].files[0];
    // return if no file is selected
    if (!file){
            // show the modal with the error
            $("#errorMessage").text("Please select a file");
            $("#errorModal").css("display", "block");
        return;
    }

    var reader = new FileReader();
    reader.onload = function(e){
        var keystore = e.target.result;
        var password = $("#passwordVendor").val();
        try {
            // decrypt the wallet
            var wallet = web3.eth.accounts.decrypt(keystore, password);
            // display the wallet address
            $("#walletAddressVendor").val(wallet.address);
            // display the private key
            $("#privateKeyVendor").val(wallet.privateKey);
        } catch (error) {
            // show the modal with the error
            $("#errorMessage").text(error.message);
            $("#errorModal").css("display", "block");

        }
    };
    reader.readAsText(file);


});


$("#vendorTokensButton").click(function(){
    // increment the value in "counter" variable of the contract by sending a signed transaction using the private key
    var privateKey = $("#privateKeyVendor").val();

    // alert if no private key is entered
    if (privateKey == ""){
        // show the modal with the error
        $("#errorMessage").text("Please enter a private key");
        $("#errorModal").css("display", "block");
        return;
    }

    var wallet = web3.eth.accounts.privateKeyToAccount(privateKey);
    // contract creator 0x8DC4bAC59E0a169419Eb8dB57920ADe558E47725
    var contractAddress = tokenAddress;
    var contract = new web3.eth.Contract(ABI, contractAddress);
    var amount = 1 //web3.utils.toWei('1', 'ether');; // 1 token
    var transaction = contract.methods.transfer(tokenAddress, amount);
    var encodedABI = transaction.encodeABI();
    var tx = {
        from: wallet.address,
        to: contractAddress,
        gas: 2000000,
        data: encodedABI
    };

    // show the modal saying that the transaction is in progress
    $("#errorMessage").text("Transaction in progress.  This could take 30s");
    $("#errorModal").css("display", "block");

    web3.eth.accounts.signTransaction(tx, privateKey).then(function(signedTx){
        web3.eth.sendSignedTransaction(signedTx.rawTransaction).on('receipt', function(receipt){
            $("#transactionRequestVendor").val(JSON.stringify(tx));
            $("#transactionResultVendor").val(JSON.stringify(receipt));

            // dismiss the modal
            $("#errorModal").css("display", "block");
        });
    });

});

const ABI = [
{
"inputs": [
    {
        "internalType": "string",
        "name": "_name",
        "type": "string"
    },
    {
        "internalType": "string",
        "name": "_symbol",
        "type": "string"
    },
    {
        "internalType": "uint8",
        "name": "_decimals",
        "type": "uint8"
    },
    {
        "internalType": "uint256",
        "name": "initialSupply",
        "type": "uint256"
    }
],
"stateMutability": "nonpayable",
"type": "constructor"
},
{
"anonymous": false,
"inputs": [
    {
        "indexed": true,
        "internalType": "address",
        "name": "owner",
        "type": "address"
    },
    {
        "indexed": true,
        "internalType": "address",
        "name": "spender",
        "type": "address"
    },
    {
        "indexed": false,
        "internalType": "uint256",
        "name": "value",
        "type": "uint256"
    }
],
"name": "Approval",
"type": "event"
},
{
"inputs": [
    {
        "internalType": "address",
        "name": "spender",
        "type": "address"
    },
    {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
    }
],
"name": "approve",
"outputs": [
    {
        "internalType": "bool",
        "name": "",
        "type": "bool"
    }
],
"stateMutability": "nonpayable",
"type": "function"
},
{
"inputs": [],
"name": "buyToken",
"outputs": [],
"stateMutability": "payable",
"type": "function"
},
{
"inputs": [
    {
        "internalType": "address",
        "name": "recipient",
        "type": "address"
    },
    {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
    }
],
"name": "transfer",
"outputs": [
    {
        "internalType": "bool",
        "name": "",
        "type": "bool"
    }
],
"stateMutability": "nonpayable",
"type": "function"
},
{
"anonymous": false,
"inputs": [
    {
        "indexed": true,
        "internalType": "address",
        "name": "from",
        "type": "address"
    },
    {
        "indexed": true,
        "internalType": "address",
        "name": "to",
        "type": "address"
    },
    {
        "indexed": false,
        "internalType": "uint256",
        "name": "value",
        "type": "uint256"
    }
],
"name": "Transfer",
"type": "event"
},
{
"inputs": [
    {
        "internalType": "address",
        "name": "sender",
        "type": "address"
    },
    {
        "internalType": "address",
        "name": "recipient",
        "type": "address"
    },
    {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
    }
],
"name": "transferFrom",
"outputs": [
    {
        "internalType": "bool",
        "name": "",
        "type": "bool"
    }
],
"stateMutability": "nonpayable",
"type": "function"
},
{
"inputs": [
    {
        "internalType": "address",
        "name": "owner",
        "type": "address"
    },
    {
        "internalType": "address",
        "name": "spender",
        "type": "address"
    }
],
"name": "allowance",
"outputs": [
    {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
    }
],
"stateMutability": "view",
"type": "function"
},
{
"inputs": [
    {
        "internalType": "address",
        "name": "account",
        "type": "address"
    }
],
"name": "balanceOf",
"outputs": [
    {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
    }
],
"stateMutability": "view",
"type": "function"
},
{
"inputs": [],
"name": "decimals",
"outputs": [
    {
        "internalType": "uint8",
        "name": "",
        "type": "uint8"
    }
],
"stateMutability": "view",
"type": "function"
},
{
"inputs": [],
"name": "name",
"outputs": [
    {
        "internalType": "string",
        "name": "",
        "type": "string"
    }
],
"stateMutability": "view",
"type": "function"
},
{
"inputs": [],
"name": "symbol",
"outputs": [
    {
        "internalType": "string",
        "name": "",
        "type": "string"
    }
],
"stateMutability": "view",
"type": "function"
},
{
"inputs": [],
"name": "totalSupply",
"outputs": [
    {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
    }
],
"stateMutability": "view",
"type": "function"
}
];

