export const TOGGLE_SPACE = 'TOGGLE_SPACE';

export const toggleSpace = (x, y) => ({
  type: TOGGLE_SPACE,
  payload: {x, y},
});
