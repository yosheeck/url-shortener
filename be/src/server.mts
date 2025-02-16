import express from 'express';

import { config } from './libs/config.js';
import { logInfo } from './libs/log.js';
import { addUrl, getUrl } from './api/api.mjs';
import { initDataBase } from './libs/mongoDb.js';

async function main() {
  await initDataBase();

  // Set up HTTP server and HTTP endpoints.
  const app = express();

  // display all incmoing requests
  app.use((req, res, next) => {
    logInfo({eventType: 'incomingRequest', method: req.method, url: req.url});
    next();
  });

  app.post('/api/addUrl', [express.json()], addUrl);
  app.get('/:urlId', getUrl);

  app.listen(config.serverPort, () => {
    logInfo({eventType: 'serverListening', port: config.serverPort});
  });
}

main();
