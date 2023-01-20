import { Component, ComponentFactoryResolver, ComponentRef, OnInit, ViewContainerRef } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/angular';
import { AssignmentComponent, AssignmentsService, PeopleService, TasksService } from 'src/app/core';
import * as moment from 'moment-timezone';
import esLocale from '@fullcalendar/core/locales/es';
import { AssignmentScheduleComponent } from 'src/app/core/components/assignment-schedule/assignment-schedule.component';

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
    private tasksSvc:TasksService,
    private containerRef: ViewContainerRef
  ) {
    this.assignmentsSvc.assignments$.subscribe((tasks)=>{
      
      this.calendarOptions = {
        locale:esLocale,
        initialView: 'timeGridDay',
        height: 'auto',
        slotDuration: '00:30:00',
        slotLabelInterval: '00:30',
        eventOverlap:false,
        contentHeight:'auto',
        eventChange:(event)=>{
          console.log(event.event.start);
          console.log(event.event.extendedProps.assignment.dateTime)
          
          var assignment = {...event.event.extendedProps.assignment};
          assignment.dateTime = moment(event.event.start).toISOString();
          this.assignmentsSvc.updateAssignment(assignment);
          
        },
        editable:true,
        events: tasks.map(async a=>{
          try {
            var task = await this.tasksSvc.getTaskById(a.taskId);  
            return {
              "title":task.name, 
              "start":moment(a.dateTime).toISOString(), 
              "end":moment(a.dateTime).add(task.durationInSecs, 'seconds').toISOString(),
              "assignment":a
            };
          } catch (error) {
            return{
              "title":"", 
              "start":null,
              "end":null,
              "assignment":a
            }
          }
          
          
        }),
        eventContent:(arg)=>{
          var comp:ComponentRef<AssignmentScheduleComponent> = this.containerRef.createComponent(AssignmentScheduleComponent);
          comp.instance.assignment = arg.event.extendedProps.assignment;
          return { domNodes: [comp.location.nativeElement] }
          
        }

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
