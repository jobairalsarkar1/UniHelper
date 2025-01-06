const { google } = require('googleapis');
const dotenv = require("dotenv");
const { OAuth2 } = google.auth;

dotenv.config();

// Configure OAuth2 Client
const oAuth2Client = new OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  process.env.REDIRECT_URI
);

// Set OAuth2 credentials
oAuth2Client.setCredentials({
  refresh_token: process.env.MEET_REFRESH_TOKEN,
});

/**
 * Generate a Google Meet link for a consultation.
 * @param {string} teacherId - The ID of the teacher.
 * @param {Date} consultationTime - The scheduled time for the consultation.
 * @returns {Promise<string>} The Google Meet link.
 */
const generateMeetLink = async (teacherId, consultationTime) => {
  try {
    const calendar = google.calendar({ version: 'v3', auth: oAuth2Client });

    const startTime = new Date(consultationTime);
    const endTime = new Date(startTime.getTime() + 60 * 60 * 1000); // 1-hour meeting

    const event = {
      summary: `Consultation with Teacher ${teacherId}`,
      description: 'Scheduled consultation via BracuGeeks.',
      start: {
        dateTime: startTime.toISOString(),
        timeZone: 'Asia/Dhaka', // Set the appropriate timezone
      },
      end: {
        dateTime: endTime.toISOString(),
        timeZone: 'Asia/Dhaka',
      },
      conferenceData: {
        createRequest: {
          requestId: `meet-${Date.now()}`,
          conferenceSolutionKey: { type: 'hangoutsMeet' },
        },
      },
    };

    const response = await calendar.events.insert({
      calendarId: 'primary', // Default calendar
      resource: event,
      conferenceDataVersion: 1,
    });

    const meetLink = response.data.hangoutLink;

    if (!meetLink) {
      throw new Error('Failed to generate Google Meet link');
    }

    return meetLink;
  } catch (error) {
    console.error('Error generating Meet link:', error.message);
    throw error;
  }
};

module.exports = { generateMeetLink };
