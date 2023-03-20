import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  private _dataSoruce = new BehaviorSubject<any>(null);
  public _data: Observable<any> = this._dataSoruce.asObservable();

  constructor() {}

  set setData(data: any) {
    this._dataSoruce.next(data);
  }

  get getData() {
    return this._data;
  }
}
