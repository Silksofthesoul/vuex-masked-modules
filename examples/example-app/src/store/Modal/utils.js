export const findIndex = (arr, name) => arr
.findIndex(({name:_name}) => _name === name);

export const getIndex = (arr, name) => {
  const index = findIndex(arr, name);
  return index === -1 ? null : index;
};

export const isExist = arg => !(arg === undefined || arg === null || Number.isNaN(arg));

export const co = o => JSON.parse(JSON.stringify(o));
