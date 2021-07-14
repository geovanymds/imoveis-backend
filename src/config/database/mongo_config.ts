export const uri = <string>process.env.DB_URI;

export const config = {
  db: process.env.DB_NAME,
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
