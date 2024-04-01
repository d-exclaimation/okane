import { func } from "./func";

/**
 * Check if the date is within 7 days of the current date
 * @param date - The date to check
 * @param now - The current date
 * @returns True if the date is within 7 days of the current date
 */
export const isWithinTheSameWeek = func((date: Date, now: Date) => {
  // get different in date and now (in days)
  const diff = Math.abs(date.getDate() - now.getDate());

  // if the date is within 7 days of the current date
  return diff <= 7;
});
