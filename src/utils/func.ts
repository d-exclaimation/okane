import * as R from "remeda";

export type Purry<T extends (...args: any[]) => any> = {
  (...args: Parameters<T>): ReturnType<T>;
  (...args: CurriedParameters<T>): CurriedReturnType<T>;
};

export type CurriedParameters<T extends (...args: any[]) => any> = T extends (
  arg1: any,
  ...rest: infer R
) => any
  ? R
  : never;

export type CurriedReturnType<T extends (...args: any[]) => any> = T extends (
  arg1: infer A,
  ...rest: any[]
) => infer U
  ? (arg1: A) => U
  : never;

export function func<T extends (...args: any[]) => any>(fn: T) {
  return ((...args: any[]) => R.purry(fn, args)) as Purry<T>;
}

export const test = func((a: number, b: number) => a + b);
