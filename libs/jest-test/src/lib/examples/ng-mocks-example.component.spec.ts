import { ComponentFixture } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';
import {
  ChildComponent,
  ExampleComponent,
  ExampleService
} from '@playground/examples';
import {
  createMockObject,
  JestTestModule
} from '@playground/jest-test';
import {
  itShouldBeWCAGCompliance,
  mockRenderComponent,
  PageHelper
} from '@playground/unit-tests';
import { MockBuilder } from 'ng-mocks';
import { BehaviorSubject } from 'rxjs';

class ExampleComponentPage extends PageHelper<ExampleComponent> {
  get button(): HTMLElement {
    return this.elementQuery('button');
  }

  get streamLabel(): HTMLElement {
    return this.elementQuery('span');
  }
}

describe('Component(NgMock): ExampleComponent', () => {
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

    return MockBuilder(ExampleComponent)
      .mock(ChildComponent)
      .mock(ExampleService, service)
      .replace(TranslateModule, JestTestModule);
  });

  beforeEach(() => {
    ({ component, fixture, page } = mockRenderComponent(ExampleComponent, ExampleComponentPage));
    fixture.detectChanges();
  });

  it('should be compliance', async () => {
    await itShouldBeWCAGCompliance(fixture.nativeElement);
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

    expect(page.streamLabel?.innerHTML).toBe('fromClick');
    expect(fixture).toMatchSnapshot();
  });
});
