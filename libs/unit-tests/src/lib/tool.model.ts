type NonFunctionPropertyNames<T> = { [K in keyof T]: T[K] extends (...args: any[]) => any ? never : K }[keyof T] & string;
type FunctionPropertyNames<T> = { [K in keyof T]: T[K] extends (...args: any[]) => any ? K : never }[keyof T] & string;
type ConstructorPropertyNames<T> = { [K in keyof T]: T[K] extends new (...args: any[]) => any ? K : never }[keyof T] &
  string;
export interface Tool {
  fn(callback?: Function): any;
  spyOn<T extends {}, M extends NonFunctionPropertyNames<Required<T>>>(
    object: T,
    method: M,
    accessType: 'get'
  ): any;
  spyOn<T extends {}, M extends NonFunctionPropertyNames<Required<T>>>(
    object: T,
    method: M,
    accessType: 'set'
  ): any;
  spyOn<T extends {}, M extends FunctionPropertyNames<Required<T>>>(
    object: T,
    method: M
  ): any;
  spyOn<T extends {}, M extends ConstructorPropertyNames<Required<T>>>(
    object: T,
    method: M
  ): any;
}
