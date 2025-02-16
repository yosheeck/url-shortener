import { MongoClient, Db } from 'mongodb';
import { config } from "./config";
import { logInfo } from "./log";

export let mongoClient: MongoClient | null = null;
export let mongoDb: Db | null = null;

export async function initDataBase() {
  const connectOptions = {
    connectTimeoutMS: 3000,
    serverSelectionTimeoutMS: 3000,
  };

  logInfo({ eventType: 'mongoConnecting', url: config.mongoUrl, connectOptions });

  mongoClient = await MongoClient.connect(config.mongoUrl, connectOptions);

  logInfo({ eventType: 'mongoConnected', url: config.mongoUrl });

  mongoDb = mongoClient.db(config.dbName);

  logInfo({ eventType: 'mongoUseDb', dbName: config.dbName });
};

export function getMongoDb(): Db {
  if (!mongoDb) {
    throw new Error('Mongo client is not initialized');
  }

  return mongoDb;
  
}