const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
export function monthNameFinder(date) {
  const d = new Date(date);
  return monthNames[d.getMonth()];
}
