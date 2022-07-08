async function connect() {
  const metamaskLink = "https://metamask.io/";
  if (typeof window.ethereum !== undefined) {
    console.log("Metamask found!");
    await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    console.log("Connected to metamask wallet!");
  } else {
    console.log(`get metamask from here: ${metamaskLink}`);
  }
}