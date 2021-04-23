// const fs = require("fs");
// const files = fs.readFileSync("./");

const EventEmitter = require("events");
const emitter = new EventEmitter();

function onUserChat(userName, message){
    console.log(`${userName} chat: ${message}`);
}
emitter.on("userChat", onUserChat);
emitter.emit("userChat","I","is chat");
emitter.off("userChat", onUserChat);
emitter.emit("userChat","I","type");
