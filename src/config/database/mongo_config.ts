export const uri = <string>process.env.DB_URI;

export const config = {
  user: process.env.DB_USER,
  pass: process.env.DB_PASS,
  db: process.env.DB_NAME,
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
