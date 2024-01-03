import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  ViewEncapsulation
} from '@angular/core';
import { defer } from 'rxjs';
import { ExampleService } from './example.service';

@Component({
  standalone: true,
  selector: 'ui-child',
  template: `
    <div>Child Component template</div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  imports: [CommonModule],
})
export class ChildComponent{

}
