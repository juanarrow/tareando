import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';
import { Person } from 'src/app/core/models/person.model';
import { PhotoItem, PhotoService } from '../../services/photo.service';
import { PlatformService } from '../../services/platform.service';

@Component({
  selector: 'app-person-detail',
  templateUrl: './person-detail.component.html',
  styleUrls: ['./person-detail.component.scss'],
})
export class PersonDetailComponent implements OnInit {

  
  form:FormGroup;
  mode:"New" | "Edit" = "New";
  currentImage = new BehaviorSubject<string>("");
  currentImage$ = this.currentImage.asObservable();
  @Input('person') set person(person:Person){
    if(person){
      this.form.controls.id.setValue(person.id);
      this.form.controls.docId.setValue(person.docId);
      this.form.controls.first_name.setValue(person.first_name);
      this.form.controls.last_name.setValue(person.last_name);
      this.form.controls.nickname.setValue(person.nickname);
      this.form.controls.picture.setValue(person.picture);
      if(person.picture)
        this.currentImage.next(person.picture);
      this.form.controls.pictureFile.setValue(null);
      this.mode = "Edit";
    }
  }
  

  constructor(
    public platform:PlatformService,
    private photoSvc:PhotoService,
    private fb:FormBuilder,
    private modal:ModalController,
    private cdr:ChangeDetectorRef
  ) { 
    this.form = this.fb.group({
      id:[null],
      docId:[''],
      first_name:['', [Validators.required]],
      last_name:['', [Validators.required]],
      nickname:['', [Validators.required]],
      picture:[''],
      pictureFile:[null]
    });
  }

  ngOnInit() {

  }

  onSubmit(){
    
    this.modal.dismiss({person: this.form.value, mode:this.mode}, 'ok');
  }

  onDismiss(result){
    this.modal.dismiss(null, 'cancel');
  }

  
  async changePic(fileLoader:HTMLInputElement, mode:'library' | 'camera' | 'file'){
    var item:PhotoItem = await this.photoSvc.getPicture(mode, fileLoader);
    this.currentImage.next(item.base64);
    this.cdr.detectChanges();
    this.form.controls.pictureFile.setValue(item.blob);
  }

}
