import FileSaver from "file-saver";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

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

export function timeConverter2(time24) {
  // Validate the input format
  if (!time24 || !/^(\d{1,2}):(\d{2})$/.test(time24)) {
    console.error(`Invalid time format: ${time24}`);
    return null; // or return a default value, e.g., "Invalid Time"
  }

  let [hours, minutes] = time24.split(":").map(Number);
  const suffix = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12; // Convert to 12-hour format
  const time12 = `${hours}:${minutes.toString().padStart(2, "0")} ${suffix}`;
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

export function decorateFaculty(faculty) {
  const fac = faculty.split(" ");
  let facShort = "";
  for (let i = 0; i < fac.length; i++) {
    facShort += fac[i][0];
  }
  return facShort;
}

export const addTime = (time, minutesToAdd) => {
  let date = new Date(`1970/01/01 ${time}`);
  date.setMinutes(date.getMinutes() + minutesToAdd);
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
};

export function showFileName(urll) {
  const url = new URL(urll);
  const fileName = url.pathname.split("/").pop();
  return decodeURIComponent(fileName);
}

export function saveFile(fileUrl, fileName) {
  FileSaver.saveAs(fileUrl, fileName);
}

export function generatePdf(elementSelector, pdfFileName) {
  const input = document.querySelector(elementSelector);
  html2canvas(input, { scale: 2 }).then((canvas) => {
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save(`${pdfFileName}.pdf`);
  });
}

// export function generatePdf(elementSelector, pdfFileName) {
//   const input = document.querySelector(elementSelector);
//   const pdf = new jsPDF("p", "mm", "a4");

//   let yPosition = 10; // Vertical starting position on the page
//   const lineHeight = 10; // Adjust the height between lines as needed

//   // Loop through the child nodes of the element to add text
//   input.childNodes.forEach((node) => {
//     if (node.nodeType === Node.TEXT_NODE) {
//       // If it's a text node, add the text to the PDF
//       const text = node.textContent.trim();
//       if (text) {
//         pdf.text(text, 10, yPosition);
//         yPosition += lineHeight;
//       }
//     } else if (node.nodeType === Node.ELEMENT_NODE) {
//       // If it's an element node, handle it based on the tag type
//       if (node.tagName === "P") {
//         const text = node.innerText.trim();
//         if (text) {
//           pdf.text(text, 10, yPosition);
//           yPosition += lineHeight;
//         }
//       } else if (node.tagName === "H1" || node.tagName === "H2") {
//         // For headings, you can increase font size
//         pdf.setFontSize(18);
//         pdf.text(node.innerText.trim(), 10, yPosition);
//         pdf.setFontSize(12); // Reset the font size
//         yPosition += lineHeight * 2; // Add more space after headings
//       } else if (node.tagName === "IMG") {
//         // For images, you can add them to the PDF as well
//         const imgData = node.src;
//         pdf.addImage(imgData, "PNG", 10, yPosition, 50, 50);
//         yPosition += 60; // Adjust yPosition after the image
//       }
//     }
//   });

//   // Save the generated PDF
//   pdf.save(`${pdfFileName}.pdf`);
// }
