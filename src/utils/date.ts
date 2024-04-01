import { func } from "./func";

/**
 * Check if the date is within 7 days of the current date
 * @param date - The date to check
 * @param now - The current date
 * @returns True if the date is within 7 days of the current date
 */
export const isWithinTheSameWeek = func((date: Date, now: Date) => {
  const diff = (now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24);
  return diff >= 0 && diff <= 7;
});
