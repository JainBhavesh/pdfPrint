import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as domToPdf from 'dom-to-pdf';

@Component({
  selector: 'app-print',
  templateUrl: './print.page.html',
  styleUrls: ['./print.page.scss'],
})
export class PrintPage {
  data: any;
  image: any = [];

  constructor(
    public activated: ActivatedRoute
  ) {
    this.activated.queryParams.subscribe((data: any) => {
      this.data = data.data;
      this.image = data.image;
    });
  }

  
  print() {
    var element = document.getElementById('pdf');
    var options = {
      filename: 'test.pdf',
      type:'base64'
    };
    setTimeout(() => {
      domToPdf(element, options, function (data) {
        console.log('done => ',data);
      });
    }, 2000);
  }
}
