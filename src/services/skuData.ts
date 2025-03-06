import data from '../data.json';

export const getSkuData = () => {
  return Promise.resolve(data.SKUs);
};
