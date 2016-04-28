export const INCREASE = 'INCREASE';

export const increase = (index, value = 1) => {
  return {
    type: INCREASE,
    value,
    index
  }
}