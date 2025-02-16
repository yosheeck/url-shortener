import express from 'express';
import { customAlphabet } from 'nanoid';

// TODO: make that configurable.
const nanoid = customAlphabet('1234567890abcdefghijklmnopqrstuvwxyz', 4);

export function addUrl(req: express.Request, res: express.Response) {
  // Extract the original URL from the request body.
  const { originalUrl } = req.body;
  if (!originalUrl) {
    res.status(400).send({status: 'Missing parameter "originalUrl".'});
    return;
  }

  // Generate a short URL.
  const urlId = nanoid();
  console.log(urlId);
  
  res.status(200).send({
    status: 'ok', 
    urlId
  });
}

