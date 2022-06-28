import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IncrementComponent } from './increment/increment.component';
import { FormsModule } from '@angular/forms';
import { DougnuthComponent } from './dougnuth/dougnuth.component';
import { NgChartsModule } from 'ng2-charts';



@NgModule({
  declarations: [
    IncrementComponent,
    DougnuthComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgChartsModule
  ],
  exports: [
    IncrementComponent,
    DougnuthComponent
  ]
})
export class ComponentsModule { }
