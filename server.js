const jsonServer = require('json-server');
const auth = require('json-server-auth');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();
const cors = require('cors');
const fetch = require('node-fetch');

// Configurazione CORS esplicita
const corsOptions = {
  origin: ['https://valevent.github.io', 'http://localhost:4200'],
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 204
};

server.use(cors(corsOptions));
server.use(middlewares);

server.db = router.db;
server.use(auth);

// =========================================================
// NUOVO: Endpoint Proxy per le News API
// =========================================================
const NEWS_API_URL = 'https://newsapi.org/v2/everything'; // O l'URL della tua API di notizie scelta
// const NEWS_API_KEY = 'd837f48ed2fe4fe094706057da58575c'; // La tua API Key per le notizie
const NEWS_API_KEY = process.env.NEWS_API_KEY; // <-- commento la riga sopra e uso questa per prendere la chiave da una variabile d'ambiente, per evitare di esporre la chiave nell'applicazione e poterla gestire in modo sicuro (su render)

server.get('/proxy-news', async (req, res) => {
  try {
    const keyword = req.query.q;
    if (!keyword) {
      return res.status(400).json({ error: 'Keyword parameter (q) is required.' });
    }

    // Costruisci l'URL per l'API di notizie esterna
    const params = new URLSearchParams({
      q: keyword,
      sortBy: 'popularity',
      apiKey: NEWS_API_KEY
      // Aggiungi qui altri parametri se la tua API li supporta (es. language: 'it')
    });

    const response = await fetch(`${NEWS_API_URL}?${params.toString()}`); // 
    if (!response.ok) {
      const errorData = await response.json();
      console.error('External News API Error:', response.status, errorData);
      return res.status(response.status).json(errorData);
    }

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Proxy Error:', error);
    res.status(500).json({ error: 'Internal server error during news fetch.' });
  }
});
// =========================================================

server.use(router);

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`JSON Server is running on port ${PORT}`);
});