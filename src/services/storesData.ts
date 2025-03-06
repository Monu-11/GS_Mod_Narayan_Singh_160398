import data from '../data.json';

export const getStoresData = () => {
  return Promise.resolve(data.Stores);
};
