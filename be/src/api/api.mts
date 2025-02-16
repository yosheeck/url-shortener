import express from 'express';
import { fetchUrlFromDB, registerUrl } from '../model/shortUrl.mjs';

export async function addUrl(req: express.Request, res: express.Response) {
  // Extract the original URL from the request body.
  const { originalUrl } = req.body;
  if (!originalUrl) {
    res.status(400).send({status: 'Missing parameter "originalUrl".'});
    return;
  }

  const registeredUrl = await registerUrl(originalUrl);
  
  res.status(200).send({
    status: 'ok', 
    originalUrl: registeredUrl.originalUrl,
    urlId: registeredUrl.urlId
  });
}

export async function getUrl(req: express.Request, res: express.Response) {
  const urlId = req.params.urlId;
  if (!urlId) {
    res.status(400).send({status: 'Missing parameter "urlId".'});
    return;
  }

  // Fetch the original URL from the database.
  const shortUrl = await fetchUrlFromDB({urlId});
  if (!shortUrl) {
    res.status(404).send({status: 'URL not found.', shortUrl, urlId});
    return;
  }

  res.redirect(shortUrl.originalUrl);
}
