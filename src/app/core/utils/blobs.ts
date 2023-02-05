import { Observable } from "rxjs";

export class FileReaderA extends window.FileReader {
	constructor() {
		super();
		const zoneOriginalInstance = (this as any)['__zone_symbol__originalInstance'];
		return zoneOriginalInstance || this;
	}
}
window.FileReader = FileReaderA;

export function dataURLtoBlob( dataUrl ):Promise<Blob>{
    return new Promise((resolve, reject)=>{
        var req = new XMLHttpRequest;

        req.open( 'GET', dataUrl );
        req.responseType = 'arraybuffer';

        req.onload = function fileLoaded(e)
        {
            // If you require the blob to have correct mime type
            var mime = this.getResponseHeader('content-type');

            resolve( new Blob([this.response], {type:mime}) );
        };

        req.send();
    });
}

export function blobToBase64(blob:Blob):Promise<string>{
    return new Promise((resolve, reject)=>{
        var reader = new FileReader();
        if (blob) {
        reader.onload = () => {   
            resolve(reader.result as string);    
        };
        reader.onerror = (error) =>{
            reject(error);
        }
        reader.readAsDataURL(blob);        
        } 
    });
}