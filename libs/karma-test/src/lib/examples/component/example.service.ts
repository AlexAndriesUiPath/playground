import { Injectable } from '@angular/core';
import {
  defer,
  map,
  Subject
} from 'rxjs';

@Injectable()
export class ExampleService {
  data$ = defer(() => this.stream).pipe(
    map(stream => ({ stream }))
  );

  private stream = new Subject<string>();

  updateStream(data: string) {
    this.stream.next(data);
  }
}
