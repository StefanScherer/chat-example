# chat-example

This is a simple Node.js chat example based on socket.io.

## Chat server
Start the chat server with
```bash
npm install
node app.js
```

Open two browsers on port 3000

```bash
open http://localhost:3000
```

And type something into the chat text box.


## Vagrant
Additionally you can spin up three boxes with Vagrant

* server - start the Node.js chat server here
* client01 - a Windows 7 client with WireShark and Chrome Browser installed
* client02 - another Windows 7 client for further tests

### server

```bash
vagrant ssh server
cd /vagrant
npm install
node app.js
```

### client01

