import { TestBed } from '@angular/core/testing';
import { ExampleService } from '@playground/examples';
import { KarmaTestModule } from '@playground/karma-test';

describe('Service(Karma): ExampleService', () => {
  let service: ExampleService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ExampleService],
      imports: [KarmaTestModule]
    });
  });

  it('should update data$ based on stream', (done) => {
    service = TestBed.inject(ExampleService);
    const streamValue = 'new stream';
    service.data$.subscribe((data) => {
      expect(data.stream).toBe(streamValue);
      done();
    });

    service.updateStream(streamValue);
  });
});
