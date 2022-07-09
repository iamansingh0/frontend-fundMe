# LINK
[play with fundme](https://iamansingh0.github.io/frontend-fundMe/)
## HTML Set Up
- create a html file `index.htm`
- add this bare minimum code there
```html
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Fund Me Web Page</title>
    </head>
    <body>
        hello!
    </body>
</html>
```

### Connecting html to metamask
1. If you don't have metamask installed, [install](https://metamask.io/) it now!
2. Now we have metamask, check if we have `ethereum` object in our `window` object.
3. Create a js file: `main.js`
4. Link it with html file.
```js
const metamaskLink = "https://metamask.io/";
if(typeof window.ethereum !== undefined){
    console.log("Metamask found!");
} else {
    console.log(`get metamask from here: ${metamaskLink}`)
}
```
5. If the above code is giving output as `metamask found`, then you are good to go.
6. Now the metamask is found, let's connect it to our web page using `eth_requestAccounts` method.
Add this line after `console.log("Metamask found!");` line:
```js
window.ethereum.request({
        method: "eth_requestAccounts"
    })
console.log("Connected to metamask wallet!");
```
refresh the page and you'll see metamask popping up.
7. It is very annoying, every time you hitting refresh and metamask asking for connect, to fix it, we need to make an **async** function and put the connecting code there.
```js
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
```
8. Create a button in html file, onClick, this button will connect to metamask.
```html
<button id="connectBtn" onclick="connect()">Connect your wallet</button>
```
