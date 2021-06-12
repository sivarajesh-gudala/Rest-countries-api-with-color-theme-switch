import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  public subject = new BehaviorSubject<any>('');
  public latLngSubject = this.subject.asObservable();
  constructor() {}
}
