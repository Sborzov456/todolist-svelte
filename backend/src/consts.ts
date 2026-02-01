export const PORT = process.env.PORT || 3001;
export const MONGO_DB_URL = `mongodb://${process.env["MONGO_INITDB_ROOT_USERNAME"]}:${process.env["MONGO_INITDB_ROOT_PASSWORD"]}@mongodb:27017/${process.env["MONGO_INITDB_DATABASE"]}?authSource=${process.env["MONGO_INITDB_ROOT_USERNAME"]}`;
