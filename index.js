const http = require('http');
const promisify = require('util').promisify;
const exec = promisify(require('child_process').exec);
const express = require('express');
const socketio = require('socket.io');

const REFRESH_INTERVAL_MS = 1 * 1000;
const app = express();
const server = http.createServer(app);
const io = socketio(server);

const host = process.env.MEMGRAPH_HOST || '127.0.0.1';
const port = process.env.MEMGRAPH_PORT || 9500;

app.use('/vendor', express.static(__dirname + '/vendor'));

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  console.log('a user connected');

  const loop = setInterval(async () => {
    const memInfo = await getMemInfo();
    socket.emit('memInfo', memInfo);
  }, REFRESH_INTERVAL_MS);

  socket.on('disconnect', () => clearInterval(loop));
});

server.listen(port, host, function(){
  console.log(`listening on ${host}:${port}`);
});

function parseMemInfo(text) {
  const lines = text.trim().split('\n');
  const memInfo = lines.reduce((sum, line) => ({
    ...sum,
    [line.split(':')[0]]: line.split(/\s+/)[1]
  }), {});
  return memInfo;
}

async function getMemInfo() {
  let memInfoText = '';
  try {
    const result = await exec('cat /proc/meminfo');
    memInfoText = result.stdout;
  } catch (e) {
    console.warn(e.message.trim());
  }
  return parseMemInfo(memInfoText);
}
