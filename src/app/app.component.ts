import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Home', url: '/folder/Home', icon: 'home'},
    { title: 'People', url: '/folder/People', icon: 'people' },
    { title: 'Tasks', url: '/folder/Tasks', icon: 'file-tray-full' },
    { title: 'Assignments', url: '/folder/Assign', icon: 'list' },
    { title: 'Task pane', url: '/folder/Task Panel', icon: 'layers' },
  ];
  public labels = [];
  constructor() {}
}
