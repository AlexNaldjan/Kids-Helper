/* eslint-disable import/no-unresolved */
/* eslint-disable quotes */
const multer = require("multer");
const path = require("path");

const storage = multer.discStorage({
  destination(req, file, cb) {
    cb(null, "public/avatars/");
  },
  filename(req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

const docTypes = ["image/png", "image/jpeg", "image/jpg"];

const filterFile = (req, file, cb) => {
  if (docTypes.includes(file.mimetype)) {
    cb(null, true);
  }
};

module.exports = multer({ storage, filterFile });
