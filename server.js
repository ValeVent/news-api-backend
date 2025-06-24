const jsonServer = require('json-server');
const auth = require('json-server-auth'); // <-- Aggiungi questa linea
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();
const cors = require('cors');

// Configurazione CORS più esplicita (raccomandata)
const corsOptions = {
  origin: ['https://valevent.github.io'], // L'origine del tuo frontend
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 204
};

server.use(cors(corsOptions)); // Usa la configurazione CORS esplicita
server.use(middlewares);

// Aggiungi queste linee per json-server-auth (DEVE stare qui)
server.db = router.db; // Collega il router al database di json-server-auth
server.use(auth);      // Usa il middleware di autenticazione

server.use(router); // Poi il router normale per le risorse

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`JSON Server is running on port ${PORT}`);
});