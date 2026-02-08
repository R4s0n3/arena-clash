import { WebSocketServer } from "ws";
import { GameRoom } from "./GameRoom.js";

const PORT = Number(process.env.PORT) || 3001;
const MAX_PLAYERS_PER_ROOM = 16;

const wss = new WebSocketServer({ port: PORT });
const rooms: GameRoom[] = [new GameRoom(MAX_PLAYERS_PER_ROOM)];

function findAvailableRoom(): GameRoom {
  for (const room of rooms) {
    if (room.playerCount < room.maxPlayers) {
      return room;
    }
  }
  const newRoom = new GameRoom(MAX_PLAYERS_PER_ROOM);
  rooms.push(newRoom);
  return newRoom;
}

wss.on("connection", (ws) => {
  const room = findAvailableRoom();
  room.addPlayer(ws);
});

console.log(`⚔️  Arena Clash server running on ws://localhost:${PORT}`);
console.log(`   Max ${MAX_PLAYERS_PER_ROOM} players per room`);
