export function TimestampConverter(timestamp, notTimeDiff) {
  // Check if timestamp is an empty string or null or undefined
  if (!timestamp) {
    return "-"; // or return ""; if you prefer an empty string
  }

  const date = new Date(timestamp);
  // Check if timestamp is a valid date
  if (isNaN(date.getTime())) {
    return "-";
  }

  const now = new Date();
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  const timeDifference = now - date;
  const minutesDifference = Math.floor(timeDifference / (1000 * 60));
  const hoursDifference = Math.floor(timeDifference / (1000 * 60 * 60));

  if (minutesDifference < 60 && !notTimeDiff) {
    if (minutesDifference === 1) {
      return `${minutesDifference} minute ago`;
    }
    return `${minutesDifference} minutes ago`;
  } else if (hoursDifference < 24 && !notTimeDiff) {
    if (hoursDifference === 1) {
      return `${hoursDifference} hour ago`;
    }
    return `${hoursDifference} hours ago`;
  }

  const localDate = new Intl.DateTimeFormat("en-US", options).format(date);
  return localDate;
}
