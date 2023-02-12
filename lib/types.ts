// eslint-disable-next-line @typescript-eslint/ban-types
export type Merge<A, B> = A & B extends infer U extends Object ? { [K in keyof U]: U[K] } : never;

export type RecursivePartial<T> = {
  [P in keyof T]?: RecursivePartial<T[P]>;
};
