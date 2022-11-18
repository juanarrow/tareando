import { LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import { PersonComponent } from '.'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { PersonDetailComponent, TaskComponent, TaskDetailComponent, AssignmentComponent, AssignmentDetailComponent } from '.';
import { PersonSelectableComponent } from './components/person-selectable/person-selectable.component';
import { TaskSelectableComponent } from './components/task-selectable/task-selectable.component';
import { DateTimeSelectableComponent } from './components/date-time-selectable/date-time-selectable.component';
import { AssignmentScheduleComponent } from './components/assignment-schedule/assignment-schedule.component';
import es from '@angular/common/locales/es';
import en from '@angular/common/locales/en';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { createTranslateLoader } from './utils/translate';

registerLocaleData(en);
registerLocaleData(es);

@NgModule({
  declarations: [
    PersonComponent,
    PersonDetailComponent,
    TaskComponent,
    TaskDetailComponent,
    AssignmentComponent,
    AssignmentDetailComponent,
    PersonSelectableComponent,
    TaskSelectableComponent,
    DateTimeSelectableComponent,
    AssignmentScheduleComponent

  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule.forRoot(),
    HttpClientModule,
    TranslateModule.forChild({
      loader: {
      provide: TranslateLoader,
      useFactory: (createTranslateLoader),
      deps: [HttpClient]
      }
      }),
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
    PersonSelectableComponent,
    TaskSelectableComponent,
    DateTimeSelectableComponent,
    AssignmentScheduleComponent,
    HttpClientModule
  ],
  providers:[
    {
      provide: LOCALE_ID,
      useValue: 'es'
    },
  ]
})
export class CoreModule { }
