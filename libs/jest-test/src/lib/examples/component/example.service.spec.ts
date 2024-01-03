import { TestBed } from '@angular/core/testing';
import { JestTestModule } from '@playground/jest-test';
import { ExampleService } from './example.service';

describe('Service(Jest): ExampleService', () => {
  let service: ExampleService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ExampleService],
      imports: [JestTestModule]
    });
  });

  it('should update data$ based on stream', (done: jest.DoneCallback) => {
    service = TestBed.inject(ExampleService);
    const streamValue = 'new stream';
    service.data$.subscribe((data) => {
      expect(data.stream).toBe(streamValue);
      done();
    });

    service.updateStream(streamValue);
  });
});
