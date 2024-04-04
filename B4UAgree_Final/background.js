let port = null; 
console.log("i'm in background")
port = chrome.runtime.connectNative('com.bforuagree.main');

port.onMessage.addListener(function (msg) {
  console.log("i'm listening")
  console.log('Received' + msg);
});

port.onDisconnect.addListener(function (error) {
    //console.log(error)
    console.log("last error " + chrome.runtime.lastError.message)
});