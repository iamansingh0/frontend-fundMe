import { ethers } from "./ethers-5.6.esm.min.js";
import { abi, contractAddress } from "./constants.js";

const fundBtn = document.getElementById("fund");
const balanceBtn = document.getElementById("balanceBtn");
const withdrawBtn = document.getElementById("withdraw");
const getBalanceAmount = document.getElementById("balanceP");
const withdrawAmount = document.getElementById("withdrawP");
fundBtn.onclick = fund;
balanceBtn.onclick = getBalance;
withdrawBtn.onclick = withdraw;

async function getBalance() {
  if (typeof window.ethereum !== "undefined") {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const balance = await provider.getBalance(contractAddress);
    getBalanceAmount.style.visibility = "visible";
    getBalanceAmount.innerHTML = ethers.utils.formatEther(balance);
    getBalanceAmount.innerHTML += " eth";
  }
}

// fund function
async function fund() {
  const ethAmount = document.getElementById("ethAmount").value;
  console.log(`Funding with ${ethAmount} Eth....`);
  if (typeof window.ethereum !== undefined) {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, abi, signer);
    try {
      const transactionResponse = await contract.fund({
        value: ethers.utils.parseEther(ethAmount),
      });
      await listenForTransactionMine(transactionResponse, provider);
      console.log("Funded 🙌");
    } catch (error) {
      console.log(error);
    }
  }
}

function listenForTransactionMine(transactionResponse, provider) {
  console.log(`Mining: ${transactionResponse.hash}....`);
  return new Promise((resolve, reject) => {
    provider.once(transactionResponse.hash, (transactionReceipt) => {
      console.log(
        `Completed with ${transactionReceipt.confirmations} confirmations`
      );
      resolve();
    });
  });
}

async function withdraw() {
  console.log(`Withdrawing Amount....`);
  if (typeof window.ethereum !== "undefined") {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const balance = await provider.getBalance(contractAddress);
    const contract = new ethers.Contract(contractAddress, abi, signer);
    console.log(`Withdrawing ${ethers.utils.formatEther(
      balance
    )} eth..`);
    withdrawAmount.style.visibility = "visible";
    try {
      const transactionResponse = await contract.withdraw();
      await listenForTransactionMine(transactionResponse, provider);
      console.log("Done");
      withdrawAmount.innerHTML = "DONE 😎";
    } catch (error) {
      console.log(error);
    }
  }
}
