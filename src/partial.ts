import { RecursivePartial } from './types';

export function applyPartial<T extends Record<string, any>>(
  obj: T,
  partial: RecursivePartial<T>
): T {
  const res = { ...obj };
  for (const key in partial) {
    if (typeof partial[key] === 'object') {
      // @ts-expect-error: FIXME: Type this properly
      res[key] = applyPartial(res[key], partial[key]);
    } else {
      // @ts-expect-error: FIXME: Type this properly
      res[key] = partial[key];
    }
  }
  return res;
}
