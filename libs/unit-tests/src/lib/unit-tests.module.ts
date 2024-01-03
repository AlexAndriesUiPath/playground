import { HttpClientTestingModule } from '@angular/common/http/testing';
import {
  NgModule,
  Pipe,
  PipeTransform
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormsModule,
  ReactiveFormsModule
} from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import {
  TranslateLoader,
  TranslateModule,
  TranslateService
} from '@ngx-translate/core';
import {
  EMPTY,
  Observable
} from 'rxjs';
import { MockRouterLinkDirective } from './directives/router-link.directive.mock';
import { MockTranslatePipe } from './pipes/translate.pipe.mock';

class MockTranslateLoader implements TranslateLoader {
  getTranslation(_lang: string): Observable<void> {
    return EMPTY;
  }
}

export const MockTranslateService = () => ({
  currentLang: 'en_US',
  setDefaultLang: jest.fn(),
  use: jest.fn(() => EMPTY),
  instant: jest.fn((value: string): string => value),
});



@NgModule({
  declarations: [
    MockTranslatePipe,
    MockRouterLinkDirective,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterTestingModule,
    HttpClientTestingModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useClass: MockTranslateLoader,
      }
    })
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterTestingModule,
    HttpClientTestingModule,
    TranslateModule,
    MockTranslatePipe,
    MockRouterLinkDirective,
  ],
  providers: [
    {
      provide: TranslateService,
      useFactory: MockTranslateService,
    }
  ]
})
export class UnitTestsModule {}
