/**
 * ValueOf Utility
 * @module shared-types/common/utils
 *
 * Object-এর value গুলোর union type।
 */

export type ValueOf<T> = T[keyof T];

export type ValueOfArray<T extends readonly unknown[]> = T[number];
