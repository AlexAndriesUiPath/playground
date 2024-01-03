import {
  Directive,
  HostBinding,
  Input
} from '@angular/core';

@Directive({
  selector: '[routerLink]',
})
export class MockRouterLinkDirective {
  @Input('routerLink') link!: never;

  navigatedTo = null;

  @HostBinding('click')
  clickHandler(): void {
    this.navigatedTo = this.link;
  }
}
