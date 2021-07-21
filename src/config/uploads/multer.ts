import multer from "multer";
import path from "path";
import crypto from "crypto";

export default multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.resolve(__dirname, "..", "..", "..", "public", "images"));
  },
  filename: (req, file, cb) => {
    crypto.randomBytes(10, (error, hash) => {
      if (error) {
        cb(error, file.filename);
      }
      const dt = new Date();
      file.filename = `${dt.getFullYear()}${dt.getMonth()}${dt.getDate()}-${hash.toString(
        "hex"
      )}-${file.originalname}`;
      cb(null, file.filename);
    });
  },
});
