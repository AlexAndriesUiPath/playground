import { NgModule } from '@angular/core';
import { RootService } from '@playground/examples';
import { UnitTestsModule } from '@playground/unit-tests';
import {
  provideMockedObject,
  tool
} from './proxy';

@NgModule({
  imports: [UnitTestsModule.withTool(tool)],
  exports: [UnitTestsModule],
  providers: [
    provideMockedObject(RootService),
  ],
})
export class KarmaTestModule {}
