export const formatDateWithSeconds = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};

export const createDateFromFormat = (dateString: string): Date => {
  const [year, day, month] = dateString.split("/").map(Number);
  const formattedDateString = `${month}/${day}/${year}`;
  return new Date(formattedDateString);
};

export const getAge = (date: Date): number => {
  const currentDate = new Date();

  let age = currentDate.getFullYear() - date.getFullYear();

  // Adjust age based on the month and day
  if (
    currentDate.getMonth() < date.getMonth() ||
    (currentDate.getMonth() === date.getMonth() &&
      currentDate.getDate() < date.getDate())
  ) {
    age--;
  }

  return age;
};

export const isValidDate = (date: Date): boolean => {
  return !isNaN(date.getTime());
};
