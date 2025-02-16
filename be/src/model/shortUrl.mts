import { customAlphabet } from "nanoid";
import { getMongoDb } from '../libs/mongoDb.js';

// TODO: make the set of characters configurable.
const theNanoid = customAlphabet('1234567890abcdefghijklmnopqrstuvwxyz', 4);

const dbCollectionName = 'shortUrls';

type ShortUrl = {
  originalUrl: string;
  urlId: string;
};

type FetchUrlQuery = {
  originalUrl?: string;
  urlId?: string;
}

// fetch from the database by the original URL
export async function fetchUrlFromDB(query: FetchUrlQuery): Promise<ShortUrl | null> {
  let rv: ShortUrl | null = null;

  let dbQuery;

  if (query.originalUrl) {
    dbQuery = {
      originalUrl: query.originalUrl
    }
  } else {
    dbQuery = {
      urlId: query.urlId
    }
  }

  const mongoCursor = await getMongoDb().collection(dbCollectionName).find(dbQuery);
  const arrayOfResponses = await mongoCursor.sort({ 'meta.createdAtMs': 1 }).toArray();

  if (arrayOfResponses.length > 0) {
    const document = arrayOfResponses[0];
    rv = {
      originalUrl: document.originalUrl,
      urlId: document.urlId,
    }
  }

  return rv;
}

async function addUrlToDB(originalUrl: string, urlId: string): Promise<void> {
  const doc = {
    originalUrl: originalUrl,
    urlId: urlId,
  };

  await getMongoDb().collection(dbCollectionName).insertOne(doc);
}


export async function registerUrl(originalUrl: string): Promise<ShortUrl> {
  const returnShortUrl = {
    originalUrl: originalUrl,
    urlId: 'xxx'
  };

  // Fetch the URL from the database.
  const urlFromDb = await fetchUrlFromDB({originalUrl});

  if (urlFromDb) {
    // Return the existing short URL.
    returnShortUrl.urlId = urlFromDb.urlId;
  } else {
    // Generate a short URL.
    returnShortUrl.urlId = theNanoid();

    // And add to DB
    addUrlToDB(originalUrl, returnShortUrl.urlId);
  }

  return returnShortUrl;
}