export const INCREASE = 'INCREASE';
export const DECREASE = 'DECREASE';
export const ACTIVATE = 'ACTIVATE';

export const increase = (index, value = 1) => {
  return {
    type: INCREASE,
    value,
    index
  }
}

export const decrease = (index, value = 1) => {
  return {
    type: DECREASE,
    value,
    index
  }
}

export const activate = (index) => {
  return {
    type: ACTIVATE,
    index
  }
}