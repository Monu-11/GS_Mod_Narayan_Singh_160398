import data from '../data.json';

export const getPlanningData = () => {
  return Promise.resolve(data.Planning);
};
