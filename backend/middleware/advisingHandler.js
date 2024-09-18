const timeToMinutes = (time) => {
  const [hours, minutes] = time.split(":").map(Number);
  return hours * 60 + minutes;
};

const checkTimeClash = (selectedSections, newSection) => {
  if (selectedSections.length === 0) {
    return false;
  }
  const newStart = timeToMinutes(newSection.schedule.startTime);
  const newEnd = timeToMinutes(newSection.schedule.endTime);
  const newLabStart = newSection.lab?.startTimeL
    ? timeToMinutes(newSection.lab.startTimeL)
    : null;
  const newLabEnd = newSection.lab?.endTimeL
    ? timeToMinutes(newSection.lab.endTimeL)
    : null;

  for (const section of selectedSections) {
    const sectionStart = timeToMinutes(section.schedule.startTime);
    const sectionEnd = timeToMinutes(section.schedule.endTime);
    const sectionLabStart = section.lab?.startTimeL
      ? timeToMinutes(section.lab.startTimeL)
      : null;
    const sectionLabEnd = section.lab?.endTimeL
      ? timeToMinutes(section.lab.endTimeL)
      : null;
    if (newStart < sectionEnd && newEnd > sectionStart) {
      return true;
    }

    if (newStart < sectionLabEnd && newEnd > sectionLabStart) {
      return true;
    }

    if (
      newLabStart &&
      newLabEnd &&
      sectionLabStart &&
      sectionLabEnd &&
      newLabStart < sectionLabEnd &&
      newLabEnd > sectionLabStart
    ) {
      continue;
    }
  }
  return false;
};

module.exports = { checkTimeClash };
