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
  KarmaTestModule,
  provideMockedObject
} from '@playground/karma-test';
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

  get childComponent(): HTMLElement {
    return this.elementQuery('ui-child');
  }

  get streamLabel(): HTMLElement {
    return this.elementQuery('span');
  }
}

describe('Component(Karma): ExampleComponent', () => {
  let fixture: ComponentFixture<ExampleComponent>;
  let component: ExampleComponent;
  let page: ExampleComponentPage;
  let service: any;
  let dataStream: BehaviorSubject<{ stream: string }>;
  let root: jest.Mocked<RootService>;

  beforeEach(() => {
    dataStream = new BehaviorSubject<{ stream: string }>({ stream: '' });
    service = createMockObject(ExampleService);
    service.data$ = dataStream.asObservable();
    service.updateStream = jasmine.createSpy('updateStream').and.callFake((stream: string) => dataStream.next({ stream }));

    TestBed.configureTestingModule({
      imports: [ExampleComponent],
      providers: [
        provideMockedObject(RootService)
      ]
    }).overrideComponent(ExampleComponent, {
      set: {
        changeDetection: ChangeDetectionStrategy.Default,
        imports: [
          KarmaTestModule,
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

  it('should call updateStream method', () => {
    const newStreamData = 'new Data';
    component.updateStreamHandler(newStreamData);
    expect(service.updateStream).toHaveBeenCalledWith(newStreamData);

    fixture.detectChanges();

    expect(page.streamLabel.innerHTML).toBe('new Data');
    expect(root.init).toHaveBeenCalledTimes(1);
  });

  it('should set the `fromClick` value in stream', () => {
    page.button.dispatchEvent(new CustomEvent('click'));

    fixture.detectChanges();

    expect(page.streamLabel.innerHTML).toBe('fromClick');
  });

  it('should have the child component rendered', () => {
    expect(page.childComponent.innerHTML).toBe('');
  });
});
