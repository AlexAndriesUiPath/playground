import {
  Provider,
  Type
} from '@angular/core';
import { Tool } from '../tool.model';

type FunctionPropertyNames<T> = {
  [K in keyof T]: T[K] extends (...args: any[]) => any ? K : never;
}[keyof T] & string;

export function baseSpyOnObject<O extends object>(tool: Tool, target: O, methods?: string[]) {
  if (Array.isArray(methods)) {
    return methods.reduce((acc, method) => ({
      ...acc,
      [method]: tool.spyOn(target, method as FunctionPropertyNames<Required<O>>)
    }), {});
  }

  return Object.keys(target).reduce((acc, property) => {
    if (typeof target[property as keyof O] !== 'function') {
      return acc;
    }

    return {
      ...acc,
      [property]: tool.spyOn(target, property as FunctionPropertyNames<Required<O>>)
    };
  }, {});
}

export function baseSpyOnFunctions(tool: Tool, functions: Function[]) {
  const object = functions.reduce((acc, func) => ({
    ...acc,
    [func.name]: func
  }), {});

  return baseSpyOnObject(tool, object);
}

interface PropSpies {
  [key: string]: any;
}

export function baseCreateMockObject<O>(tool: Tool, type: Type<O>): any {
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
        target[key] = tool.fn();
        continue;
      }

      if (typeof descriptor?.get === 'function') {
        Object.defineProperty(target, key, descriptor);
        target.propSpies[key] = tool.spyOn(target, key, 'get');
      }
    }

    mockProtoMethods(Object.getPrototypeOf(proto));
  };

  mockProtoMethods(type.prototype);

  return target;
}

export function baseProvideMockedObject<O>(tool: Tool, type: Type<O>): Provider {
  return {
    provide: type,
    useFactory: () => baseCreateMockObject<O>(tool, type)
  };
}
