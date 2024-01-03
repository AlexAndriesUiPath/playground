import { CommonModule } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import {
  ModuleWithProviders,
  NgModule
} from '@angular/core';
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
import { Tool } from './tool.model';

class MockTranslateLoader implements TranslateLoader {
  getTranslation(_lang: string): Observable<void> {
    return EMPTY;
  }
}

export const MockTranslateService = (tool: Tool) => () => ({
  currentLang: 'en_US',
  setDefaultLang: tool.fn(),
  use: tool.fn(() => EMPTY),
  instant: tool.fn((value: string): string => value)
});

@NgModule({
  declarations: [
    MockTranslatePipe,
    MockRouterLinkDirective
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
        useClass: MockTranslateLoader
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
    MockRouterLinkDirective
  ]
})
export class UnitTestsModule {
  static withTool(tool: Tool): ModuleWithProviders<UnitTestsModule> {
    return {
      ngModule: UnitTestsModule,
      providers: [
        {
          provide: TranslateService,
          useFactory: MockTranslateService(tool)
        }
      ]
    }
  }
}
