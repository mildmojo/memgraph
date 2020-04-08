# memgraph

Web app to graph free memory. Display on a tablet to catch a low-memory condition before it happens.

![image](https://user-images.githubusercontent.com/103495/78741847-6f3ad200-7928-11ea-90fe-8a88c4917efc.png)

## Instructions

1. Clone this repo.
   `git clone git@github.com:mildmojo/memgraph.git`
2. Install dependencies.
   `yarn install`
   or
   `npm install`
3. Start server.
   `yarn start`
   or
   `node index.js`
4. Visit the server in your browser at http://localhost:9500

## Configuration

If you want the server to listen on external network interfaces, not just localhost, you can set `MEMGRAPH_HOST` and `MEMGRAPH_PORT` environment variables. For example, to run on your local network interface, you might set `MEMGRAPH_HOST` to your machine's network address:

`MEMGRAPH_HOST=192.168.1.192 yarn start`

Or, to listen on all of the machine's network interfaces, try setting the host to 0.0.0.0:

`MEMGRAPH_HOST=0.0.0.0 yarn start`

For other front end styling and behavior adjustments, see the constants at the top of the script section in `index.html`.

## Usage

Click the fullscreen toggle icon (⏫) at the top left of the graph to toggle fullscreen mode.

If the front end loses its connection to the server, you'll see the Offline icon until it is able to reconnect.
