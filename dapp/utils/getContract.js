import ContractAbi from "../../artifacts/contracts/Dapp.sol/Dapp.json";
import { ethers } from "ethers";

export default function getContract() {
  // Creating a new provider
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  // Getting the signer
  const signer = provider.getSigner();
  // Creating a new contract factory with the signer, address and ABI
  let contract = new ethers.Contract(
    "0xb4800cDfa6365f2Af3E392fc4b7262CD872d8446",
    ContractAbi.abi,
    signer
  );
  // Returning the contract
  return contract;
}
