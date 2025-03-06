import data from '../data.json';

export const getCalendarData = () => {
  return Promise.resolve(data.Calendar);
};
