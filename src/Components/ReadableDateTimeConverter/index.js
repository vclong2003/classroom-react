export function readableDateTimeConvert(stringDateTime, dateOnly = false) {
  const dateObj = new Date(Date.parse(stringDateTime));
  const options = dateOnly
    ? {
        year: "numeric",
        month: "long",
        day: "numeric",
      }
    : {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      };
  return dateObj.toLocaleDateString("en-US", options);
}
