import * as moment from "moment";
import { environment } from "./environments";

export const ageChecker = (dateOfBirth: string): boolean => {
  const allowedAge = environment.allowed_max_age;

  const providedDate = moment(dateOfBirth, "YYYY/MM/DD");

  if (!providedDate.isValid()) {
    return false; // Invalid date string
  }

  return getAge(providedDate) < 10;
};

export const getAge = (date: moment.Moment): number => {
  const currentDate = moment();
  let diffInYears = currentDate.diff(date, "years");

  // Adjust the difference by subtracting 1 year if the current date is earlier in the year than the provided date
  if (
    currentDate.month() < date.month() ||
    (currentDate.month() === date.month() && currentDate.date() < date.date())
  ) {
    diffInYears--;
  }
  return diffInYears;
};
