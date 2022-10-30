import { Component, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/angular';
import { AssignmentsService, PeopleService, TasksService } from 'src/app/core';
import * as moment from 'moment-timezone';
import esLocale from '@fullcalendar/core/locales/es';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss'],
})
export class ScheduleComponent implements OnInit {

  public calendarOptions: CalendarOptions = this.initCalendar();

  constructor(
    private assignmentsSvc:AssignmentsService,
    private peopleSvc:PeopleService,
    private tasksSvc:TasksService
  ) {
    this.assignmentsSvc.assignments$.subscribe((tasks)=>{
      
      this.calendarOptions = {
        locale:esLocale,
        initialView: 'timeGridDay',
        height: 'auto',
        slotDuration: '00:30:00',
        slotLabelInterval: '01:00',
        eventOverlap:false,
        eventChange:(event)=>{
          console.log(event);
        },
        editable:true,
        events: tasks.map(a=>{
          var task = this.tasksSvc.getTaskById(a.taskId);
          return {"title":task.name, "start":moment(a.dateTime).toISOString(), "end":moment(a.dateTime).add(task.durationInSecs, 'seconds').toISOString()};
        })
      };
      
    });
  }


  public ngOnInit(): void {
    // HACK Rerender the calendar and correctly display it
     setTimeout(() => {
       this.calendarOptions.footerToolbar = false;
     }, 300);
  }


   private initCalendar(): CalendarOptions {

    return {
      initialView: 'timeGridWeek',
      height: 'auto',
      slotDuration: '00:30:00',
      slotLabelInterval: '01:00',
      editable:true,
      events: [
    ],
    };
  }
}
