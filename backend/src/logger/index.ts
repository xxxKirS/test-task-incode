export const logger = {
  error: (message: string, error?: Error) => {
    console.error(`${message}:`, error);
  },
};
