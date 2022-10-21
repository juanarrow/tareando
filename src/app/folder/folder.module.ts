import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FolderPageRoutingModule } from './folder-routing.module';

import { FolderPage } from './folder.page';
import { HomeComponent } from './components/home/home.component';
import { TasksComponent } from './components/tasks/tasks.component';
import { PeopleComponent } from './components/people/people.component';
import { PersonComponent } from './components/person/person.component';
import { PersonDetailComponent } from './components/person-detail/person-detail.component';
import { TaskComponent } from './components/task/task.component';
import { TaskDetailComponent } from './components/task-detail/task-detail.component';
import { AssignmentComponent } from './components/assignment/assignment.component';
import { AssignmentsComponent } from './components/assignments/assignments.component';
import { AssignmentDetailComponent } from './components/assignment-detail/assignment-detail.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    FolderPageRoutingModule
  ],
  declarations: [
    FolderPage, 
    HomeComponent, 
    AssignmentComponent,
    AssignmentsComponent,
    AssignmentDetailComponent,
    TasksComponent, 
    TaskComponent, 
    TaskDetailComponent,
    PeopleComponent, 
    PersonComponent, 
    PersonDetailComponent]
})
export class FolderPageModule {}
