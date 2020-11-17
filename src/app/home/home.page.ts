import { Component } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { NavController } from '@ionic/angular';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  Company: FormGroup;
  doc: any = [{
    dis: '',
    image: ''
  }];

  constructor(
    public formBuilder: FormBuilder,
    public navCtrl: NavController
  ) {
    this.Company = this.formBuilder.group({
      title: [''],
      name: [''],
      address: [''],
      docNo: ['']
    })
  }

  upload($event, i) {
    console.log(i + 'Event => ', $event);
    const file = (event.target as HTMLInputElement).files[0];
    const pattern = /image-*/;
    const reader = new FileReader();

    if (!file.type.match(pattern)) {
      console.log('File format not supported');
      return;
    }

    reader.onload = () => {
      this.doc[i].image = reader.result.toString();
      console.log('Image pic => ', this.doc[i].image);

      setTimeout(() => {
      }, 400);
    };
    reader.readAsDataURL(file);
  }

  add() {
    this.doc.push({ des: '', image: '' })
  }

  remove(i) {
    this.doc.splice(i, 1);
  }

  preview() {
    this.navCtrl.navigateForward('print',{
      queryParams:{
        data:this.Company.value,
        image:this.doc
      }
    });

  }
}
