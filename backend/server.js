const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const { v4: uuidv4 } = require('uuid');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

let clients = {};

wss.on('connection', (ws) => {
  const id = uuidv4();
  clients[id] = { ws, name: null, room: null };

  ws.on('message', (msg) => {
    try {
      const data = JSON.parse(msg);

      if (data.type === 'join') {
        clients[id].name = data.name;
        clients[id].room = data.room;
      }

      if (data.type === 'message') {
        const { room, name } = clients[id];
        const payload = JSON.stringify({
          type: 'message',
          from: name,
          text: data.text,
        });

        Object.values(clients).forEach((client) => {
          if (client.room === room) {
            client.ws.send(payload);
          }
        });
      }
    } catch (e) {
      console.error('Erro:', e.message);
    }
  });

  ws.on('close', () => {
    delete clients[id];
  });
});

// ❌ Não serve mais frontend diretamente
// app.use(express.static('/app/frontend'));

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
