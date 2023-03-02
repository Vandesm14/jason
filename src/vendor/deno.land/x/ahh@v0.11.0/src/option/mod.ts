import { Result } from '../result/mod';

/** Represents an {@linkcode Option} that does not exist. */
export type None = undefined | null;
/** Represents an {@linkcode Option} that does exist. */
export type Some<T> = T;
/**
 * Represents an optional value that either exists ({@linkcode Some}) or does
 * not exist ({@linkcode None}).
 */
export type Option<T> = None | Some<T>;

export const None = undefined;

/**
 * Returns whether `opt` is a {@linkcode Some}.
 *
 * @example
 * ```ts
 * import { default as O, None } from "./mod.ts";
 *
 * console.log(O.isSome(1)); // true
 * console.log(O.isSome(None)); // false
 * ```
 */
export function isSome<T>(opt: Option<T>): opt is Some<T> {
  return typeof opt !== 'undefined' && opt !== null;
}

/**
 * Returns whether `opt` is a {@linkcode None}.
 *
 * @example
 * ```ts
 * import { default as O, None } from "./mod.ts";
 *
 * console.log(O.isNone(1)); // false
 * console.log(O.isNone(None)); // true
 * ```
 */
export function isNone<T>(opt: Option<T>): opt is None {
  return !isSome(opt);
}

/**
 * Returns whether `opt` strictly equals `value`, or `false` if it is a
 * {@linkcode None}.
 *
 * @example
 * ```ts
 * import { default as O, None } from "./mod.ts";
 *
 * console.log(O.contains(1, 1)); // true
 * console.log(O.contains(1, 2)); // false
 * console.log(O.contains(None, 1)); // false
 * ```
 */
export function contains<T>(opt: Option<T>, value: T): boolean {
  return isSome(opt) ? opt === value : false;
}

/**
 * Calls `f` with `opt`, and returns the original `opt`.
 *
 * @example
 * ```ts
 * import { default as O, None } from "./mod.ts";
 *
 * console.log(O.inspect(1, (i) => i + 1)); // 1
 * console.log(O.inspect(None, (i: number) => i + 1)); // undefined
 * ```
 */
export function inspect<T>(opt: Option<T>, f: (_: T) => unknown): Option<T> {
  if (isSome(opt)) f(opt);
  return opt;
}

/**
 * Calls `f` with `opt`, and returns the result.
 *
 * @example
 * ```ts
 * import { default as O, None } from "./mod.ts";
 *
 * console.log(O.map(1, (i) => i + 1)); // 2
 * console.log(O.map(None, (i: number) => i + 1)); // undefined
 * ```
 */
export function map<T, U>(opt: Option<T>, f: (_: T) => U): Option<U> {
  return isSome(opt) ? f(opt) : None;
}

/**
 * Calls `f` with `opt`, and returns it if the result is `true`.
 *
 * @example
 * ```ts
 * import { default as O, None } from "./mod.ts";
 *
 * console.log(O.filter(2, (i) => i % 2 === 0)); // 2
 * console.log(O.filter(1, (i) => i % 2 === 0)); // None
 * console.log(O.filter(None, (i: number) => i % 2 === 0)); // None
 * ```
 */
export function filter<T>(opt: Option<T>, f: (_: T) => boolean): Option<T> {
  return isSome(opt) && f(opt) ? opt : None;
}

/**
 * Returns `opt` if it is a {@linkcode Some}, or throws.
 *
 * @example
 * ```ts
 * import { default as O, None } from "./mod.ts";
 *
 * console.log(O.unwrap(1)); // 1
 * O.unwrap(None); // throws
 * ```
 */
export function unwrap<T>(
  opt: Option<T>
): typeof opt extends Some<T> ? T : never {
  if (isSome(opt)) return opt as never;
  throw Error('attempted to unwrap a `None` value');
}

/**
 * Returns `opt` if it is a {@linkcode Some}, or returns `default_`.
 *
 * @example
 * ```ts
 * import { default as O, None } from "./mod.ts";
 *
 * console.log(O.unwrapOr(1, 2)); // 1
 * console.log(O.unwrapOr(None, 2)); // 2
 * ```
 */
export function unwrapOr<T>(opt: Option<T>, default_: T): T {
  return isSome(opt) ? opt : default_;
}

/**
 * Return `opt` if it is a {@linkcode Some}, or `other`.
 *
 * @example
 * ```ts
 * import { default as O, None } from "./mod.ts";
 *
 * console.log(O.or(1, 2)); // 1
 * console.log(O.or(None, 2)); // 2
 * console.log(O.or(2, None)); // 2
 * console.log(O.or(None, None)); // undefined
 * ```
 */
export function or<T>(opt: Option<T>, other: Option<T>): Option<T> {
  return isSome(opt) ? opt : other;
}

/**
 * Return `other` if `opt` is {@linkcode Some}, or {@linkcode None}.
 *
 * @example
 * ```ts
 * import { default as O, None } from "./mod.ts";
 *
 * console.log(O.and(1, 2)); // 2
 * console.log(O.and(None, 2)); // None
 * console.log(O.and(2, None)); // None
 * console.log(O.and(None, None)); // None
 * ```
 */
export function and<T, U>(opt: Option<T>, other: Option<U>): Option<U> {
  return isNone(opt) ? None : other;
}

/**
 * Converts `opt` into an {@linkcode Ok} if it is a {@linkcode Some}.
 *
 * @example
 * ```ts
 * import { default as O, None } from "./mod.ts";
 *
 * console.log(O.okOr(1, Error())); // 1
 * console.log(O.okOr(None, Error())); // Error()
 * ```
 */
export function okOr<T, E extends Error>(opt: Option<T>, err: E): Result<T, E> {
  return isSome(opt) ? opt : err;
}

export default {
  isSome,
  isNone,
  contains,
  inspect,
  map,
  filter,
  unwrap,
  unwrapOr,
  or,
  and,
  okOr,
};
