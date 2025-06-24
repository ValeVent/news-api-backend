const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json'); // Punta al tuo file db.json
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(router);

// Usa la porta fornita dall'ambiente (es. da Render.com) o 3000 come fallback
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`JSON Server is running on port ${PORT}`);
});