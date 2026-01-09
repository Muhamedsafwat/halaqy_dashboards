export default function convertTimeToArabic(timeStr) {
  let [time, period] = timeStr.split(" ");
  let [hours, minutes] = time.split(":").map(Number);

  if (period.toUpperCase() === "PM" && hours < 12) {
    hours += 12;
  }
  if (period.toUpperCase() === "AM" && hours === 12) {
    hours = 0;
  }

  const arabicPeriod = period.toUpperCase() === "AM" ? "صباحًا" : "مساءً";

  const displayHour = hours > 12 ? hours - 12 : hours === 0 ? 12 : hours;

  return `${displayHour}:${minutes.toString().padStart(2, "0")} ${arabicPeriod}`;
}
