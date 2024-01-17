import { ChangeDetectionStrategy } from '@angular/core';
import {
  ComponentFixture,
  TestBed
} from '@angular/core/testing';
import {
  ChildComponent,
  ExampleComponent,
  ExampleService,
  RootService
} from '@playground/examples';
import {
  createMockObject,
  JestTestModule,
  provideMockedObject
} from '@playground/jest-test';
import {
  createComponent,
  PageHelper
} from '@playground/unit-tests';
import { MockComponent } from 'ng-mocks';
import { BehaviorSubject } from 'rxjs';

class ExampleComponentPage extends PageHelper<ExampleComponent> {
  get button(): HTMLElement {
    return this.elementQuery('button');
  }

  get streamLabel(): HTMLElement {
    return this.elementQuery('span');
  }
}

describe('Component(Jest): ExampleComponent', () => {
  let fixture: ComponentFixture<ExampleComponent>;
  let component: ExampleComponent;
  let page: ExampleComponentPage;
  let service: jest.Mocked<ExampleService>;
  let root: jest.Mocked<RootService>;
  let dataStream: BehaviorSubject<{ stream: string }>;

  beforeEach(() => {
    dataStream = new BehaviorSubject<{ stream: string }>({ stream: '' });
    service = createMockObject(ExampleService);
    service.data$ = dataStream.asObservable();
    service.updateStream = jest.fn((stream) => dataStream.next({ stream }));

    TestBed.configureTestingModule({
      imports: [ExampleComponent],
      providers: [
        provideMockedObject(RootService),
      ],
    }).overrideComponent(ExampleComponent, {
      set: {
        changeDetection: ChangeDetectionStrategy.Default,
        imports: [
          JestTestModule,
          MockComponent(ChildComponent)
        ],
        providers: [{
          provide: ExampleService,
          useFactory: () => service
        }]
      }
    });

    root = TestBed.inject(RootService) as jest.Mocked<RootService>;
  });

  beforeEach(() => {
    ({ component, fixture, page } = createComponent(ExampleComponent, ExampleComponentPage));
    fixture.detectChanges();
  });

  it('should match snapshot with initial state', () => {
    expect(service.updateStream).toHaveBeenCalledTimes(1);
    expect(root.init).toHaveBeenCalledTimes(1);
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
  });
});
