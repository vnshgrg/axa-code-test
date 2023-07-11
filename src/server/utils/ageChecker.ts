import { createDateFromFormat, getAge, isValidDate } from "./dateStrings";
import { environment } from "./environments";

export const ageChecker = (dateOfBirth: string): boolean => {
  const allowedAge = environment.allowed_max_age;

  const providedDate = new Date(createDateFromFormat(dateOfBirth));

  if (!isValidDate(providedDate)) {
    return false; // Invalid date string
  }

  return getAge(providedDate) < allowedAge;
};
