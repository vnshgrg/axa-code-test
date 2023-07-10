type CronJob = (arg: any, interval: number) => void;

// basic cron job implementation with setInterval
export const cronJob: CronJob = (arg, interval) => {
  setInterval(arg, interval);
};
