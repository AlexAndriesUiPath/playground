import { NgModule } from '@angular/core';
import {
  Tool,
  UnitTestsModule
} from '@playground/unit-tests';

@NgModule({
  imports: [UnitTestsModule.withTool(jest as Tool)],
  exports: [UnitTestsModule]
})
export class JestTestModule {}
