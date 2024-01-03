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

export const tool: Tool = {
  fn(callback?: Function): any {
    if (callback) {
      return jasmine.createSpy().and.callFake(callback as any);
    }

    return jasmine.createSpy();
  },
  spyOn: jasmine.createSpyObj
}

export function spyOnObject<O extends object>(target: O, methods?: string[]) {
  return baseSpyOnObject(tool, target, methods);
}

export function spyOnFunctions(functions: Function[]) {
  return baseSpyOnFunctions(tool, functions);
}

export function createMockObject<O>(type: Type<O>): any {
  return baseCreateMockObject(tool, type);
}

export function provideMockedObject<O>(type: Type<O>): Provider {
  return baseProvideMockedObject(tool, type);
}
