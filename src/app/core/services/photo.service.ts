import { Injectable } from '@angular/core';
import { Camera, CameraOptions } from '@awesome-cordova-plugins/camera/ngx';
import { File, FileEntry } from '@awesome-cordova-plugins/file/ngx';
import { blobToBase64, dataURLtoBlob } from '../utils/blobs';


export interface PhotoItem{
  base64:string;
  blob:Blob;
}

@Injectable({
  providedIn: 'root'
})
export class PhotoService {

  private cameraOptions: CameraOptions = {
    quality: 40,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE,
    correctOrientation: true,
    sourceType: this.camera.PictureSourceType.CAMERA,
    destinationType: this.camera.DestinationType.FILE_URI,
  }

  private libraryOptions: CameraOptions = {
    quality: 40,
    correctOrientation: true,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE,
    sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
    destinationType: this.camera.DestinationType.FILE_URI,
  }

  constructor(
    private camera:Camera,
    private file:File
  ) {
    
  }

  private async getPictureFromInputFile(input:HTMLInputElement):Promise<PhotoItem>{
    return new Promise((resolve, reject)=>{
      input.click();
      var that = this;
      input.onchange = function () {
        var file = input.files[0];
        var reader = new FileReader();
        reader.onload = () => { 
          resolve({
            base64:reader.result as string,
            blob:file
          });
        };
        reader.onerror = (error) =>{
          reject(error);
        }
        reader.readAsDataURL(file);
      }
    });
  }

  async getPicture(source: 'library' | 'camera' | 'file', inputFile:HTMLInputElement=null):Promise<PhotoItem>{
    
    return new Promise(async (resolve, reject)=>{
      if(source==='file'){
        resolve(await this.getPictureFromInputFile(inputFile));
      }
      else{
        let options = source === 'library' ? this.libraryOptions : this.cameraOptions;
        try {
          await this.camera.cleanup().then(()=>{});  
        } catch (error) {
          //No pasa nada, simplemente lanzamos el log a la consola
          console.log(error);
        }
        
        this.camera.getPicture(options).then(async (imgData) => {
          try{
            var fileUrl = imgData.indexOf("file://") == 0 ? imgData : 'file://' + imgData;
            var fileEntry = (await this.file.resolveLocalFilesystemUrl(fileUrl) as FileEntry);
            fileEntry.file(async file=>{
              const reader = new FileReader();
              reader.onloadend = async () => {
                try {
                  var blob:Blob = await dataURLtoBlob(reader.result);  
                  var base64 = await blobToBase64(blob);
                  resolve({
                    base64: base64,
                    blob:blob as Blob
                  });
                } catch (error) {
                  reject(error);
                }
              };
              reader.readAsDataURL(file);
            }, async err => {
              reject(err);
            });
            console.log(fileEntry);
          }
          catch(error){
            reject(error);
          }
        }, async (err) => {
          reject(err);
        }).catch(async error=>{
          reject(error);
        })
      }
    });
  }
}
