export class Image {
  url : string;
  type : string = 'card';
  width : string = '600px';
  height : string = '600px';
  displayOrder : number;

  constructor(url : string) {
    this.url = url;
    this.displayOrder = 0;
  }
}
