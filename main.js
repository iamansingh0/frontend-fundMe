import { ethers } from "./ethers-5.6.esm.min.js";

const msg = document.querySelector(".connectedMsg")
const redirectLink = document.querySelector("#connectBtn a")
const info = document.querySelector(".infoText")
const connectBtn = document.getElementById("connectBtn");
connectBtn.onclick = connect;

async function connect() {
  if (typeof window.ethereum !== undefined) {
    console.log("Metamask found!");
    try {
        await window.ethereum.request({
            method: "eth_requestAccounts",
          });
    } catch(e) {
        console.log(e);
    }
    msg.style.visibility = "visible";
    info.style.visibility = "visible";
    redirectLink.setAttribute("href", "mainPage.htm");
    console.log("Connected to metamask wallet!");
  } else {
    msg.innerHTML = "😑 Please Install Metamask!";
    msg.style.visibility = "visible";
  }
}

