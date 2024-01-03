import {
  Provider,
  Type
} from '@angular/core';

type FunctionPropertyNames<T> = {
  [K in keyof T]: T[K] extends (...args: any[]) => any ? K : never;
}[keyof T] & string;

export function spyOnObject<O extends object>(target: O, methods?: string[]) {
  if (Array.isArray(methods)) {
    return methods.reduce((acc, method) => ({
      ...acc,
      [method]: jest.spyOn(target, method as FunctionPropertyNames<Required<O>>)
    }), {});
  }

  return Object.keys(target).reduce((acc, property) => {
    if (typeof target[property as keyof O] !== 'function') {
      return acc;
    }

    return {
      ...acc,
      [property]: jest.spyOn(target, property as FunctionPropertyNames<Required<O>>)
    };
  }, {});
}

export function spyOnFunctions(functions: Function[]) {
  const object = functions.reduce((acc, func) => ({
    ...acc,
    [func.name]: func,
  }), {});

  return spyOnObject(object);
}

interface PropSpies {
  [key: string]: jest.SpyInstance<any, []>;
}

export function createMockObject<O>(type: Type<O>): jest.Mocked<O> {
  const target: any = {};

  target.propSpies = {} as PropSpies;

  const mockProtoMethods = (proto: any): void => {
    if (proto === null || proto === Object.prototype) {
      return;
    }

    for (const key of Object.getOwnPropertyNames(proto)) {
      if (key === 'constructor') {
        continue;
      }

      const descriptor = Object.getOwnPropertyDescriptor(proto, key);

      if (typeof descriptor?.value === 'function') {
        target[key] = jest.fn();
        continue;
      }

      if (typeof descriptor?.get === 'function') {
        Object.defineProperty(target, key, descriptor);
        target.propSpies[key] = jest.spyOn(target, key, 'get');
      }
    }

    mockProtoMethods(Object.getPrototypeOf(proto));
  };

  mockProtoMethods(type.prototype);

  return target;
}

export function provideMockedObject<O>(type: Type<O>): Provider {
  return {
    provide: type,
    useFactory: () => createMockObject<O>(type)
  };
}
