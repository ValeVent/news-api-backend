# News API Backend (JSON Server con Autenticazione e Proxy)
Questo repository contiene il backend per l'applicazione Angular "App di News". È un server REST API simulato, implementato con json-server, che fornisce un sistema di autenticazione utente e agisce da proxy per le richieste a NewsAPI. È stato progettato per superare le limitazioni di hosting statico come GitHub Pages e le restrizioni delle API esterne.

## Descrizione Approfondita del Progetto
Il backend è un'API RESTful "fake" che serve due scopi principali per l'applicazione frontend Angular:

1.  Autenticazione Utente: Utilizza json-server-auth per gestire un sistema di login/registrazione completo, con hash delle password e generazione di token JWT. Questo permette all'applicazione frontend di avere un'autenticazione realistica senza la necessità di un database complesso.

2.  Proxy per NewsAPI: Agisce da intermediario sicuro per le richieste a NewsAPI. Questo risolve due problemi comuni:

    - Restrizioni di dominio: Molte API gratuite limitano le richieste da domini pubblici. Il proxy inoltra la richiesta dal server (Render.com), aggirando queste restrizioni.

    - Sicurezza della chiave API: La chiave API di NewsAPI non è esposta nel codice frontend, ma viene gestita in modo sicuro come variabile d'ambiente sul server.

La configurazione include il middleware cors per gestire le richieste Cross-Origin Resource Sharing (CORS), permettendo all'applicazione Angular (ospitata su un dominio diverso, come GitHub Pages) di comunicare senza problemi di sicurezza.

## Tecnologie Utilizzate
- Node.js: Ambiente di runtime per eseguire il server.

- json-server: Libreria Node.js per creare rapidamente API RESTful da un file JSON.

- json-server-auth: Estensione per json-server che aggiunge funzionalità di autenticazione (login/registrazione con JWT).

- cors: Middleware Node.js per abilitare e configurare le intestazioni CORS.

- node-fetch: Per effettuare richieste HTTP dal backend al NewsAPI.

- bcryptjs: Utilizzato da json-server-auth per l'hashing delle password.

- db.json: File JSON che funge da database per l'API (utenti).

## Struttura del Repository
Il repository contiene i seguenti file principali:

### db.json
Questo file è il database dell'applicazione. Contiene un array di oggetti users, dove le password sono hashate per sicurezza.


### package.json
Questo file definisce le informazioni del progetto Node.js, le sue dipendenze e gli script per l'avvio.


### server.js
Questo è lo script principale che configura e avvia il json-server. Include l'autenticazione (json-server-auth), il middleware cors e l'endpoint proxy per NewsAPI, recuperando la chiave API da una variabile d'ambiente.


## Come Avviare il Backend Localmente
Se desideri avviare questo backend sul tuo computer per scopi di sviluppo o test:

### Prerequisiti
- Node.js (versione LTS raccomandata)

- npm (Node Package Manager) o Yarn

### Installazione
1. Clona questo repository:

git clone https://github.com/ValeVent/news-api-backend.git

(Sostituisci ValeVent/news-api-backend.git con il tuo repository se lo hai forkato).

2. Naviga nella directory del progetto:

cd news-api-backend

3. Installa le dipendenze:

npm install

## Configurazione della Chiave API (per esecuzione locale)
Per far funzionare il proxy NewsAPI in locale, devi impostare la variabile d'ambiente NEWS_API_KEY prima di avviare il server.

### Linux/macOS:

export NEWS_API_KEY="TUA_CHIAVE_API_DI_NEWSAPI"
npm start

### Windows (CMD):

set NEWS_API_KEY="TUA_CHIAVE_API_DI_NEWSAPI"
npm start

### Windows (PowerShell):

$env:NEWS_API_KEY="TUA_CHIAVE_API_DI_NEWSAPI"
npm start

Sostituisci TUA_CHIAVE_API_DI_NEWSAPI con la tua chiave reale ottenuta da NewsAPI.org.

## Avvio del Server
1. Avvia il server JSON:

npm start

Il server sarà disponibile all'indirizzo http://localhost:3000.

- Endpoint di autenticazione: http://localhost:3000/login

- Endpoint proxy per le news: http://localhost:3000/proxy-news

- Endpoint utenti (gestito da json-server-auth): http://localhost:3000/users

## Deployment su Render.com (o Simili)
Questo backend è stato progettato per essere facilmente deployabile su piattaforme cloud come Render.com. Il server.js è configurato per utilizzare la porta fornita dall'ambiente (process.env.PORT), rendendolo compatibile con la maggior parte dei servizi di hosting.

Il deployment attuale è disponibile all'indirizzo: https://news-api-backend-xj9y.onrender.com.

### Passaggi per il Deployment su Render.com:

1. Crea un account su Render.com.

2. Crea un nuovo "Web Service".

3. Connetti il tuo repository GitHub (news-api-backend).

4. Configura il "Build Command" (es. npm install) e lo "Start Command" (es. node server.js).

5. Aggiungi la variabile d'ambiente NEWS_API_KEY nelle impostazioni del servizio su Render.com, con il valore della tua chiave API di NewsAPI.

## Contatti
- GitHub (Frontend): https://github.com/ValeVent/news-api-con-autenticazione

- GitHub (Backend): https://github.com/ValeVent/news-api-backend

- LinkedIn: https://www.linkedin.com/in/valentina-venturo

- Sito Web: http://www.valentinaventuro.it
