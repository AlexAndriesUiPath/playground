import { HttpRequest } from '@angular/common/http';

interface Params {
  [key: string]: string | string[];
}

export function expectRequestParams(request: HttpRequest<any>, params: Params): void {
  const keys = Object.keys(params);

  expect(request.params.keys().length).toEqual(keys.length);

  keys.forEach((key) => {
    if (Array.isArray(params[key])) {
      expect(request.params.getAll(key)).toEqual(params[key]);
      return;
    }

    expect(request.params.get(key)).toEqual(params[key]);
  });
}
