import { Component, OnInit, Input, Output, EventEmitter,OnChanges } from '@angular/core';
import {FileUploader,FileItem,ParsedResponseHeaders,FileSelectDirective} from "ng2-file-upload/index";
import {appConfig} from '../app.config';


@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styles: []
})
export class FileUploadComponent implements OnInit,OnChanges {

  @Output()
  public onUploadSuccess : EventEmitter<any> = new EventEmitter<any>();

  @Input()
  public model : string;

  @Input()
  public fieldname : string;

  @Input()
  public image : string;

  fileUploaded : boolean = false;

  URL : string;

  imageURL : string;
  public uploader:FileUploader;

  public hasBaseDropZoneOver:boolean = false;
  public hasAnotherDropZoneOver:boolean = false;

  public fileOverBase(e:any):void {
    this.hasBaseDropZoneOver = e;
  }

  public fileOverAnother(e:any):void {
    this.hasAnotherDropZoneOver = e;
  }

  constructor() { }

  ngOnChanges(){
    /*console.log(this.image);*/
    if(this.image) {
      this.imageURL = this.image;
    } else {
      this.imageURL = '';
      this.fileUploaded = false;
    }

  }

  ngOnInit() {
    console.log(this.fieldname);

    this.URL = `${appConfig.apiUrl}/api/${this.model}/upload`;
    this.uploader = new FileUploader({url : this.URL , authToken : localStorage.getItem("currentUser"), autoUpload : true});

    //override the onAfterAddingfile property of the uploader so it doesn't authenticate with //credentials.
    this.uploader.onAfterAddingFile = (file)=> { file.withCredentials = false; };
    //overide the onCompleteItem property of the uploader so we are
    //able to deal with the server response.
   /* this.uploader.onCompleteItem = (item:any, response:any, status:any, headers:any) => {
      console.log("ImageUpload:uploaded:", item, status, response);
    };
*/
    this.uploader.onErrorItem = (item, response, status, headers) => this.onErrorItem(item, response, status, headers);
    this.uploader.onSuccessItem = (item, response, status, headers) => this.onSuccessItem(item, response, status, headers);
  }

  onSuccessItem(item: FileItem, response: string, status: number, headers: ParsedResponseHeaders): any {
    let data = JSON.parse(response); //success server response
    /*console.log(data);*/
    this.fileUploaded = true;
    this.imageURL = `${appConfig.apiUrl}/api/${this.model}/file/${data.message}`;


    this.onUploadSuccess.emit(this.imageURL);
  }

  onErrorItem(item: FileItem, response: string, status: number, headers: ParsedResponseHeaders): any {
    console.log(JSON.parse(response)); //error server response
    this.fileUploaded = false;
  }
}
