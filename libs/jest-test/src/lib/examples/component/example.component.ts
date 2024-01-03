import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  ViewEncapsulation
} from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { defer } from 'rxjs';
import { ChildComponent } from './child.component';
import { ExampleService } from './example.service';

@Component({
  standalone: true,
  selector: 'ui-example',
  template: `
    <ng-container *ngIf="data$ | async as data">
      <span>{{ data.stream | translate }}</span>
    </ng-container>
    <ui-child></ui-child>
    <img src="#" alt="alternate text"/>
    <button (click)="updateStreamHandler('fromClick')">Set 'fromClick'</button>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  imports: [CommonModule, ChildComponent, TranslateModule],
  providers: [ExampleService],
})
export class ExampleComponent implements OnInit {
  data$ = defer(() => this.service.data$);

  private service = inject(ExampleService);

  ngOnInit() {
    this.updateStreamHandler('new stream');
  }

  updateStreamHandler(data: string): void {
    this.service.updateStream(data);
  }
}
