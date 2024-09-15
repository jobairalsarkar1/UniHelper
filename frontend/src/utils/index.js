import FileSaver from "file-saver";

export function formatDate(dateTime) {
  const dateObj = new Date(dateTime);
  const day = dateObj.getUTCDate().toString().padStart(2, "0");
  const month = (dateObj.getUTCMonth() + 1).toString().padStart(2, "0");
  const year = dateObj.getUTCFullYear();
  return `${day}/${month}/${year}`;
}

export function timeConverter(time24) {
  let [hours, minutes] = time24.split(":").map(Number);
  const suffix = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12;
  const time12 = `${hours}:${minutes.toString().padStart(2, "0")}${suffix}`;
  return time12;
}

export function convertUTCToLocal(dateTimeUTC) {
  const date = new Date(dateTimeUTC);
  const options = { year: "numeric", month: "long", day: "numeric" };
  const formatDate = date.toLocaleDateString("en-US", options);
  const formatTime = date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  return `${formatDate} ${formatTime}`;
}

export function dayFull(dayShort) {
  switch (dayShort) {
    case "sat":
      return "Saturday";
    case "sun":
      return "Sunday";
    case "mon":
      return "Monday";
    case "tue":
      return "Tuesday";
    case "wed":
      return "Wednesday";
    case "thu":
      return "Thursday";
    case "fri":
      return "Friday";
    default:
      return "Unvalid";
  }
}

export function saveFile(fileUrl) {
  FileSaver.saveAs(fileUrl);
  // const fileName = fileUrl.subString(fileUrl.lastIndexOf("/") + 1);
}
