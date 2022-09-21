// import React, { useState, useEffect, useContext } from "react";
// import { ethers } from "ethers";
// import { appContext } from "../App";
// import ContractABI from "./contractABI.json";
// import logo from "../assets/images/icon.png";

// const Login = () => {

//   const [login, setLogin, provider, setProvider, accounts, setAccounts, totalMinted, setTotalMinted, contractAddress, contractABI,, isMetamaskAvailable, setIsMetamaskAvailable] =
//     useContext(appContext);


//   useEffect(() => {
//     getTotalSupply();
//     if (isMetamaskAvailable == null) {
//       if(window.ethereum!=null){
//         setIsMetamaskAvailable(true)
//       }
//       else{
//         setIsMetamaskAvailable(false)
//       }
//     }
//   }, []);

//   async function ConnectWallet() {
//     if (window.ethereum) {
//       const Account = await window.ethereum.request({
//         method: "eth_requestAccounts",
//       });
//       if (Account.length > 0) {
//         setLogin(true);
//         setAccounts(Account);
//         const provider = new ethers.providers.Web3Provider(window.ethereum);
//         console.log(provider);
//         setProvider(provider);
//       }
//     } else {
      
//       alert("PLease install Metamask!");
//     }
//   }

//   async function getTotalSupply() {
//     const contract = new ethers.Contract(
//       contractAddress,
//       contractABI,
//       new ethers.providers.getDefaultProvider(
//         "https://ropsten.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161"
//       )
//     );
//     try {
//       const response = (await contract.totalSupply()).toString();
//       setTotalMinted(response);
//       console.log(response);
//     } catch (err) {
//       console.log(err);
//     }
//   }

//   return (
//     <div className="Container">
//       <div className="transparentBox">
//         <div className="logoDiv">
//           <img width={60} height={60} src={logo} />
//           <h1>SantaFloki</h1>
//         </div>
//         <div>
//           <h4 style={{ position: 'absolute', top: '40px', right: '30px' }}>V2 Minting</h4>
//           <h3> {totalMinted}/8000 NFTs Minted!</h3>
//         </div>
//         <button
//           className="buttonConnect"
//           onClick={() => {
//             if(isMetamaskAvailable)
//             ConnectWallet();
//           }}
//         >
//           {isMetamaskAvailable?<>Connect Wallet</>:<>Install Metamask to Mint!</>}
//         </button>
//         <h4 style={{ position: 'absolute', bottom: '50px' }}>Connect Wallet To Mint!</h4>
//       </div>
//     </div>
//   );
// };

// export default Login;



import React, { useState, useEffect, useContext } from "react";
import { ethers } from "ethers";
import { appContext } from "../App";
import ContractABI from "./contractABI.json";
import logo from "../assets/images/icon.png";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { providers } from "ethers";

const Login = () => {

  const [error,setError]=useState("");

  const [login, setLogin, provider, setProvider, accounts, setAccounts, totalMinted, setTotalMinted, contractAddress, contractABI,, isMetamaskAvailable, setIsMetamaskAvailable] =
    useContext(appContext);


  useEffect(() => {
    getTotalSupply();
    if (isMetamaskAvailable == null) {
      if(window.ethereum!=null){
        setIsMetamaskAvailable(true)
      }
      else{
        setIsMetamaskAvailable(false)
      }
    }
  }, []);

  async function ConnectWallet() {
    if (window.ethereum) {
      var Account = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      var Provider = new ethers.providers.Web3Provider(window.ethereum);
      var signer = Provider.getSigner();
      var chain = (await signer.getChainId());
      console.log(chain);
    }
    else {
      const provider = new WalletConnectProvider({
        infuraId: "2357da71dda848c8a17d7e8719ed889a",
      });
      var Account = await provider.enable();
      var Provider = new providers.Web3Provider(provider);
      var signer = Provider.getSigner();
      var chain = (await signer.getChainId());
      console.log(chain);
    }
      if (Account.length > 0) {
        if(chain === 97){
        setLogin(true);
        setAccounts(Account);
        console.log(Provider);
        setProvider(Provider);
        }
        else{
          setError("*Please switch to SmartChain-TestNet");
        }
      }
      console.log(chain);
    }

  async function getTotalSupply() {
    const contract = new ethers.Contract(
      contractAddress,
      contractABI,
      new ethers.providers.getDefaultProvider(
        "https://ropsten.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161"
      )
    );
    try {
      const response = (await contract.totalSupply()).toString();
      setTotalMinted(response);
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="Container">
      <div className="transparentBox">
        <div className="logoDiv">
          <img width={60} height={60} src={logo} />
          <h1>SantaFloki</h1>
        </div>
        <div>
          <h4 style={{ position: 'absolute', top: '40px', right: '30px' }}>V2 Minting</h4>
          <h3> {totalMinted}/8000 NFTs Minted!</h3>
        </div>
        <button
          className="buttonConnect"
          onClick={() => {
            // if(isMetamaskAvailable)
            ConnectWallet();
          }}
        >
          {isMetamaskAvailable?<>Connect Wallet</>:<>Install Metamask to Mint!</>}
        </button>
        <h4 style={{ position: 'absolute', bottom: '50px' }}>Connect Wallet To Mint!</h4>
        <h5 style={{ position: 'absolute', bottom: '0',marginBottom:'5px',letterSpacing:"1.5px" ,color:"yellow"}}>{error}</h5>
      </div>
    </div>
  );
};

export default Login;

