import {
  Provider,
  Type
} from '@angular/core';
import {
  baseSpyOnObject,
  baseSpyOnFunctions,
  baseCreateMockObject,
  baseProvideMockedObject,
  Tool
} from '@playground/unit-tests';

export function spyOnObject<O extends object>(target: O, methods?: string[]) {
  return baseSpyOnObject(jest as Tool, target, methods);
}

export function spyOnFunctions(functions: Function[]) {
  return baseSpyOnFunctions(jest as Tool, functions);
}

export function createMockObject<O>(type: Type<O>): any {
  return baseCreateMockObject(jest as Tool, type);
}

export function provideMockedObject<O>(type: Type<O>): Provider {
  return baseProvideMockedObject(jest as Tool, type);
}
