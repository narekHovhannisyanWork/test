
const config = {
  development: {
    client: "pg",
    connection: {
      host: process.env.DB_HOST || 'localhost',
      port: Number(process.env.DB_PORT || 5433),
      user: process.env.DB_USER || "postgres",
      password: process.env.DB_PASSWORD || "root",
      database: process.env.DB_NAME || "wildberies",
    },
    migrations: {
      directory: "./src/db/migrations",
    },
  },
};

export default config;
