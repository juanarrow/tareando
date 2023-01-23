import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FolderPageRoutingModule } from './folder-routing.module';

import { FolderPage } from './folder.page';
import { HomeComponent } from './components/home/home.component';
import { TasksComponent } from './components/tasks/tasks.component';
import { PeopleComponent } from './components/people/people.component';
import { PersonComponent } from '../core/components/person/person.component';
import { PersonDetailComponent } from '../core/components/person-detail/person-detail.component';
import { TaskComponent } from '../core/components/task/task.component';
import { TaskDetailComponent } from '../core/components/task-detail/task-detail.component';
import { AssignmentComponent } from '../core/components/assignment/assignment.component';
import { AssignmentsComponent } from './components/assignments/assignments.component';
import { CoreModule } from '../core/core.module';
import { ScheduleComponent } from './components/schedule/schedule.component';
import { FullCalendarModule } from '@fullcalendar/angular';

import scrollgridPlugin from '@fullcalendar/scrollgrid';
import daygridPlugin from '@fullcalendar/daygrid';
import timegridPlugin from '@fullcalendar/timegrid';

import interactionPlugin from '@fullcalendar/interaction';
import { HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { createTranslateLoader } from '../core/utils/translate';
FullCalendarModule.registerPlugins([
  scrollgridPlugin,
  daygridPlugin,
  timegridPlugin,
  interactionPlugin
]);

@NgModule({
  imports: [
    CoreModule,
    TranslateModule.forChild({
      loader: {
      provide: TranslateLoader,
      useFactory: (createTranslateLoader),
      deps: [HttpClient]
      }
      }),
    FolderPageRoutingModule,
    FullCalendarModule
  ],
  declarations: [
    FolderPage, 
    HomeComponent, 
    AssignmentsComponent,
    TasksComponent, 
    PeopleComponent,
    ScheduleComponent,
    ]
})
export class FolderPageModule {}
