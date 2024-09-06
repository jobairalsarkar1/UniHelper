const axios = require("axios");

const generateMeetLink = async (teacherId, consultationTime) => {
  const googleApiToken = process.env.GOOGLE_API_TOKEN;
  try {
    const response = await axios.post(
      "https://www.googleapis.com/calendar/v3/calendars/primary/events",
      {
        summary: "Consultation Meeting",
        description: "Scheduled Consultation",
        start: {
          dateTime: new Date(consultationTime).toISOString(),
          timeZone: "UTC",
        },
        end: {
          dateTime: new Date(
            new Date(consultationTime).getTime() + 60 * 60 * 1000
          ).toISOString(),
          timeZone: "UTC",
        },
        conferenceData: {
          createRequest: {
            requestId: "21201175-jas-goodboy",
            conferenceSolutionKey: { type: "hangoutsMeet" },
          },
        },
      },
      {
        headers: {
          Authorization: `Bearer ${googleApiToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (
      response.data.conferenceData &&
      response.data.conferenceData.entryPoints
    ) {
      return response.data.conferenceData.entryPoints[0].uri;
    } else {
      throw new Error("No meeting link found in response.");
    }
  } catch (error) {
    console.error(
      "Error generating Google Meet Link",
      error.response ? error.response.data : error.message
    );
    throw new Error("Failed to generate Google Meet Link.");
  }
};

module.exports = { generateMeetLink };
