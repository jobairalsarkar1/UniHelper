const multer = require("multer");

const storage = multer.memoryStorage();
const uploadClassroomFiles = multer({ storage });

module.exports = uploadClassroomFiles;
