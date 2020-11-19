import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
// import * as domToPdf from 'dom-to-pdf';
import { jsPDF } from "jspdf";
import domtoimage from 'dom-to-image';


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

  getImage(elem) {
    return new Promise((resolve) => {
      domtoimage.toPng(elem).then((data) => {
        console.log('Base64 image => ', data);
        resolve(data);
      })
    })
  }

  async print() {
    var headerImg, dataImage, header = document.getElementById('header');
    var doc = new jsPDF();
    var page = 1; // use this as a counter.

    setTimeout(async () => {
      console.log('pdf clicked');

      headerImg = await this.getImage(header);
      var img, prev;
      for (let i = 1; i <= this.image.length; i++) {
        img = document.getElementsByClassName('img' + (i - 1))[0];
        console.log('image node', img);

        dataImage = await this.getImage(img);
        if (i % 2 == 0) {
          doc.addImage(dataImage, 'png', 10, 150, 200, 100);
          if (this.image.length > 2)
            doc.addPage();
        } else {
          doc.addImage(headerImg, 10, 2, doc.internal.pageSize.width - 15, 40);
          doc.addImage(dataImage, 'png', 10, 45, 200, 100);
          doc.text('Prepared By  ', 10, doc.internal.pageSize.height - 30);
          doc.text('(Sign./ Date:)___________', 10, doc.internal.pageSize.height - 20);
          doc.text('(Sign./ Date:)___________', 10, doc.internal.pageSize.height - 10);
          doc.text('Page No: ' + page, doc.internal.pageSize.width - 40, doc.internal.pageSize.height - 10);
          page++;
        }
      }
      // doc.text('This is client-side Javascript, pumping out a PDF.', 20, 30);
      // doc.text('Do you like that?', 20, 20);
      doc.save('test.pdf')
    }, 1000);

    // var options = {
    //   filename: 'test.pdf',
    //   type:'base64'
    // };
    setTimeout(() => {
      // domToPdf(element, options, function (data) {
      //   console.log('done => ',data);
      // });
    }, 2000);
  }
}
