/**
 * Converts a date string to the format "DD MMM YYYY [HH:MM:SS]".
 *
 * @param {string} dateStr - The date string to format, in ISO 8601 format, e.g, '2023-02-21T09:59:42.307Z'.
 * @returns {string} The formatted date string, e.g, "16 May 2021 [13:00:27]".
 */
const formatDate = (dateStr: string) => {
  if (!dateStr) return "";

  const date = new Date(dateStr);
  const year = date.getFullYear();
  const month = new Intl.DateTimeFormat("en-US", { month: "short" }).format(
    date
  );
  const day = String(date.getDate()).padStart(2, "0");
  //   const hours = String(date.getHours()).padStart(2, "0");
  //   const minutes = String(date.getMinutes()).padStart(2, "0");
  //   const seconds = String(date.getSeconds()).padStart(2, "0");

  return `${day} ${month}, ${year} `;
};

export default formatDate;
