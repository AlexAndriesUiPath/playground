import {
  DebugElement,
  Predicate,
  Type
} from '@angular/core';
import {
  ComponentFixture,
  TestBed
} from '@angular/core/testing';
import {
  MockedComponentFixture
} from 'ng-mocks';

export abstract class PageHelper<T> {
  constructor(
    protected fixture: ComponentFixture<T> | MockedComponentFixture<T>,
  ) {}

  protected inject(name: Type<T>): T {
    return this.fixture.debugElement.injector.get(name);
  }

  protected query(predicate: Predicate<DebugElement>, debugElement?: DebugElement): DebugElement {
    return (debugElement ?? this.fixture.debugElement).query(predicate);
  }

  protected queryAll(predicate: Predicate<DebugElement>, debugElement?: DebugElement): DebugElement[] {
    return (debugElement ?? this.fixture.debugElement).queryAll(predicate);
  }

  protected componentQuery<C>(predicate: Predicate<DebugElement>, debugElement?: DebugElement): C | undefined {
    return this.query(predicate, debugElement)?.componentInstance;
  }

  protected componentQueryAll<C>(predicate: Predicate<DebugElement>, debugElement?: DebugElement): C[] | undefined {
    return this.queryAll(predicate, debugElement)?.map(item => item.componentInstance as C);
  }

  protected elementQuery<E extends HTMLElement = HTMLElement>(
    predicate: string,
    debugElement: DebugElement | E = this.fixture.nativeElement,
  ): E {
    const nativeElement = debugElement instanceof DebugElement ? debugElement.nativeElement : debugElement;

    return nativeElement.querySelector(predicate);
  }

  protected elementQueryAll<E extends HTMLElement = HTMLElement>(
    predicate: string,
    debugElement: DebugElement | E = this.fixture.nativeElement,
  ): E[] {
    const nativeElement = debugElement instanceof DebugElement ? debugElement.nativeElement : debugElement;

    return Array.from(nativeElement.querySelectorAll(predicate));
  }
}

export function createComponent<C, P extends PageHelper<C> | undefined = undefined>(
  componentType: Type<C>,
  pageHelper?: Type<P>,
): {
  fixture: ComponentFixture<C>;
  component: C;
  page: P extends PageHelper<C> ? P : undefined
} {
  const fixture = TestBed.createComponent(componentType);
  let page;

  if (typeof pageHelper !== 'undefined') {
    page = new pageHelper(fixture) as any;
  }

  return {
    fixture,
    component: fixture.componentInstance,
    page,
  }
}
