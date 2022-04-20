import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UpperPipe } from './upper.pipe';



@NgModule({
  declarations: [
    UpperPipe
  ],
  imports: [
    CommonModule
  ],
  exports:[
    UpperPipe
  ]
})
export class PipesModule { }
