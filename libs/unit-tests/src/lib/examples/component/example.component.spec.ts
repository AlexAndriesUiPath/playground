import { ChangeDetectionStrategy } from '@angular/core';
import {
  ComponentFixture,
  TestBed
} from '@angular/core/testing';
import {
  createComponent,
  createMockObject,
  PageHelper,
  provideMockedObject,
  UnitTestsModule
} from '@playground/unit-tests';
import { BehaviorSubject } from 'rxjs';
import { ExampleComponent } from './example.component';
import { ExampleService } from './example.service';

class ExampleComponentPage extends PageHelper<ExampleComponent> {
  get streamLabel(): HTMLElement {
    return this.elementQuery('span');
  }

  get button(): HTMLElement {
    return this.elementQuery('button');
  }
}

describe('Component: ExampleComponent', () => {
  let fixture: ComponentFixture<ExampleComponent>;
  let component: ExampleComponent;
  let page: ExampleComponentPage;
  let service: jest.Mocked<ExampleService>;
  let dataStream: BehaviorSubject<{ stream: string }>;

  beforeEach(() => {
    dataStream = new BehaviorSubject<{ stream: string }>({ stream: '' });
    service = createMockObject(ExampleService);
    service.data$ = dataStream.asObservable();
    service.updateStream = jest.fn((stream) => dataStream.next({ stream }));

    TestBed.configureTestingModule({
      imports: [ExampleComponent, UnitTestsModule],
      providers: [provideMockedObject(ExampleService)]
    }).overrideComponent(ExampleComponent, {
             set: {
               changeDetection: ChangeDetectionStrategy.Default
             }
           })
           .overrideProvider(ExampleService, {
             useFactory: () => service
           });
  });

  beforeEach(() => {
    ({ component, fixture, page } = createComponent(ExampleComponent, ExampleComponentPage));
    fixture.detectChanges();
  });

  it('should match snapshot with initial state', () => {
    expect(service.updateStream).toHaveBeenCalledTimes(1);
    expect(fixture).toMatchSnapshot();
  });

  it('should call updateStream method', () => {
    const newStreamData = 'new Data';
    component.updateStreamHandler(newStreamData);
    expect(service.updateStream).toHaveBeenCalledWith(newStreamData);

    fixture.detectChanges();

    expect(fixture).toMatchSnapshot();
  });

  it('should set the `fromClick` value in stream', () => {
    page.button.dispatchEvent(new CustomEvent('click'));

    fixture.detectChanges();

    expect(page.streamLabel.innerHTML).toBe('fromClick');
    expect(fixture).toMatchSnapshot();
  })
});
