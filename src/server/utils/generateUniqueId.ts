export const generateUniqueId = (): string => {
  const timestamp = Date.now().toString(36);
  const randomNumber = Math.random().toString(36).substr(2, 5);
  return timestamp + randomNumber;
};
