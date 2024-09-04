import FileSaver from "file-saver";

export function formatDate(dateTime) {
  const dateObj = new Date(dateTime);
  const day = dateObj.getUTCDate().toString().padStart(2, "0");
  const month = (dateObj.getUTCMonth() + 1).toString().padStart(2, "0");
  const year = dateObj.getUTCFullYear();
  return `${day}/${month}/${year}`;
}

export function saveFile(fileUrl) {
  FileSaver.saveAs(fileUrl);
  // const fileName = fileUrl.subString(fileUrl.lastIndexOf("/") + 1);
}
