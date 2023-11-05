export const db = {
    user: process.env.DB_USER || "postgres",
    password: process.env.DB_PASSWORD || "agro123",
    host: process.env.DB_HOST || "localhost",
    port: process.env.DB_PORT || 5432,
    database: process.env.DB_DATABASE || "agrodb",
  };
  
  export const port = process.env.PORT || 4000;

  export const jwtSecretAg = process.env.JWTSecret || "AgroTrujillo";
  export const jwtReSecretAg = process.env.JWTSecret || "REAgroTrujillo";