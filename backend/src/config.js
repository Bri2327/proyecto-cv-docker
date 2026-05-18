const config = {
  port: Number(process.env.PORT || 4000),
  db: {
    host: process.env.DB_HOST || "database",
    port: Number(process.env.DB_PORT || 3306),
    user: process.env.DB_USER || "cv_user",
    password: process.env.DB_PASSWORD || "cv_password",
    database: process.env.DB_NAME || "cv_db"
  }
};

module.exports = config;
