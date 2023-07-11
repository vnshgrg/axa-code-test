import { formatDateWithSeconds } from "./dateStrings";

export const Log = (...args: any): void => {
  const timestamp = new Date();
  console.log(`[${formatDateWithSeconds(timestamp)}]`, ...args);
};
