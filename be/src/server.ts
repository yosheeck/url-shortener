import express from 'express';

import { config } from './libs/config.js';
import { logInfo } from './libs/log.js';
import { addUrl } from './api/api.js';

async function main() {
  // Set up HTTP server and HTTP endpoints.
  const app = express();

  app.post('/api/addUrl', [express.json()], addUrl);

  app.listen(config.serverPort, () => {
    logInfo({eventType: 'serverListening', port: config.serverPort});
  });
}

main();
