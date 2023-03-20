import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AppService } from '../app.service';

@Component({
  selector: 'app-setup',
  templateUrl: './setup.component.html',
  styleUrls: ['./setup.component.css'],
})
export class SetupComponent implements OnInit {
  setupForm: FormGroup;
  tList: Truck[] = [];
  tSchema: any;
  CSS_COLOR_NAMES = [
    'deeppink',
    'darkred',
    'royalblue',
    'forestgreen',
    'LightBlue',
    'Yellow',
    'Indigo',
  ];
  _appData = {};

  constructor(
    private formBuilder: FormBuilder,
    private appService: AppService,
    private router: Router
  ) {}

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.setupForm = this.formBuilder.group({
      name: 'Ravi',
      trucks: 4,
      fund: 1000,
    });
  }

  setupInfo() {
    this.tList = [];
    for (let i = 1; i <= this.setupForm.value.trucks; i++) {
      let v: Truck = this.createItem(i);
      this.addItem(v);
    }
    this._appData['trucks'] = this.tList;
    this._appData['name'] = this.setupForm.value.name;
    this._appData['fund'] = this.setupForm.value.fund;
    localStorage.setItem('fund', this.setupForm.value.fund);
    this.appService.setData = this._appData;
    this.router.navigate(['/trucks']);
  }

  addItem(v): void {
    this.tList.push(v);
  }

  createItem(i): Truck {
    return {
      id: i,
      name: `Truck${i}`,
      color: this.CSS_COLOR_NAMES[i],
      val: 0,
      won: false,
      bet: 0,
    };
  }
}

export interface Truck {
  id: string | number;
  name: string;
  color: string;
  val: number;
  won: boolean;
  bet: number;
}
