import { func } from "./func";

export const isWithinTheSameWeek = func((date: Date, now: Date) => {
  const todayDate = now.getDate();
  const todayDay = now.getDay();

  // get first date of week
  const firstDayOfWeek = new Date(now.setDate(todayDate - todayDay));

  // get last date of week
  const lastDayOfWeek = new Date(firstDayOfWeek);
  lastDayOfWeek.setDate(lastDayOfWeek.getDate() + 6);

  return date >= firstDayOfWeek && date <= lastDayOfWeek;
});
