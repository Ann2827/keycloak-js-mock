import { Merge, RecursivePartial } from './types';

const cleanDuplicate = <T>(array: T[]): T[] => {
  return [...new Set(array.map((item) => JSON.stringify(item)))].map((item) => JSON.parse(item));
};

// FIXME: types
// eslint-disable-next-line @typescript-eslint/ban-types
const mergeObject = <T1, T2>(defaultObject: T1, newObject: T2): Merge<T1, T2> | Object => {
  if (typeof defaultObject !== 'object' || typeof newObject !== 'object') return {};

  const object: RecursivePartial<Merge<T1, T2>> = { ...defaultObject };

  for (const key in newObject) {
    const newKey = key as keyof typeof object;
    // @ts-ignore
    const newValue = newObject[newKey];
    const oldValue = object[newKey];
    if (Array.isArray(newValue) && (!oldValue || !Array.isArray(oldValue))) {
      // @ts-ignore
      object[newKey] = newObject[newKey];
    } else if (Array.isArray(newValue) && Array.isArray(oldValue)) {
      object[newKey] = cleanDuplicate<string>([...oldValue, ...newValue]);
    } else if (typeof newValue !== 'object' || typeof oldValue !== 'object') {
      object[newKey] = newValue;
    } else {
      object[newKey] = mergeObject(oldValue, newValue);
    }
  }

  return object as Merge<T1, T2>;
};

export default mergeObject;
