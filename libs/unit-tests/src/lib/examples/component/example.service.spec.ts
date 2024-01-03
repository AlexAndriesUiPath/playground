import { TestBed } from '@angular/core/testing';
import { UnitTestsModule } from '@playground/unit-tests';
import { ExampleService } from './example.service';
import DoneCallback = jest.DoneCallback;

describe('Service: ExampleService', () => {
  let service: ExampleService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ExampleService],
      imports: [UnitTestsModule]
    });
  });

  it('should update data$ based on stream', (done: DoneCallback) => {
    service = TestBed.inject(ExampleService);
    const streamValue = 'new stream';
    service.data$.subscribe((data) => {
      expect(data.stream).toBe(streamValue);
      done();
    });

    service.updateStream(streamValue);
  });
});
