import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { isLowResolution as lowres} from 'src/app/utils/screen.utils';
import { IonItemSliding } from '@ionic/angular';
import { Task } from 'src/app/core/models/task.model';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
})
export class TaskComponent implements OnInit {

  @Output() onEdit = new EventEmitter;
  @Output() onDelete = new EventEmitter;
  @Input() task:Task;
  isLowResolution = lowres;
  constructor() { }

  ngOnInit() {}

  onEditClick(slide:IonItemSliding){
    slide.close();
    this.onEdit.emit(this.task);
  }

  onDeleteClick(slide:IonItemSliding){
    slide.close();
    this.onDelete.emit(this.task);
  }
}
