import { AfterViewInit, Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { environment } from 'src/environments/environment';
import { ApiService } from './core';
import { LocaleService } from './core/services/locale.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements AfterViewInit{
  public appPages = [
    { title: 'Home', url: '/folder/Home', icon: 'home'},
    { title: 'People', url: '/folder/People', icon: 'people' },
    { title: 'Tasks', url: '/folder/Tasks', icon: 'file-tray-full' },
    { title: 'Assignments', url: '/folder/Assignments', icon: 'list' },
    { title: 'Task pane', url: '/folder/Task Panel', icon: 'layers' },
  ];
  public labels = [];

  language = 1; // 0 español, 1 inglés
  constructor(
    private translate: TranslateService,
    private locale:LocaleService
  ) {
    this.translate. setDefaultLang('en');
  }
  ngAfterViewInit(): void {
   
  }
  onLanguage(){
    this.language = (this.language+1)%2;
    switch(this.language){
      case 0:
        this.translate.setDefaultLang('es');
        this.locale.registerCulture('es');

        break;
      case 1:
        this.translate.setDefaultLang('en');
        this.locale.registerCulture('en');
        break;
    }
  }
}
