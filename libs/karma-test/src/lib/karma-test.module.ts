import { NgModule } from '@angular/core';
import { UnitTestsModule } from '@playground/unit-tests';
import { tool } from './proxy';

@NgModule({
  imports: [UnitTestsModule.withTool(tool)],
  exports: [UnitTestsModule]
})
export class KarmaTestModule {}
