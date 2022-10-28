import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PersonComponent } from '.'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { PersonDetailComponent, TaskComponent, TaskDetailComponent, AssignmentComponent, AssignmentDetailComponent } from '.';



@NgModule({
  declarations: [
    PersonComponent,
    PersonDetailComponent,
    TaskComponent,
    TaskDetailComponent,
    AssignmentComponent,
    AssignmentDetailComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule.forRoot(),
    ReactiveFormsModule
  ],
  exports:[
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    PersonComponent,
    PersonDetailComponent,
    TaskComponent,
    TaskDetailComponent,
    AssignmentComponent,
    AssignmentDetailComponent,
  ]
})
export class CoreModule { }
