import { Component, Input, OnInit } from '@angular/core';
import { AppService } from '../app.service';

@Component({
  selector: 'truck',
  templateUrl: './truck.component.html',
  styleUrls: ['./truck.component.css'],
})
export class TruckComponent implements OnInit {
  _arr: any[] = [];
  get trucks(): any[] {
    return this._arr;
  }
  @Input() set trucks(newArr: any[]) {
    this._arr = newArr;
  }

  constructor(private appService: AppService) {}

  ngOnInit() {
    this.appService.getData.subscribe((val) => {
      if (val.trucks) {
        this.trucks = val.trucks;
      }
    });
  }
}
