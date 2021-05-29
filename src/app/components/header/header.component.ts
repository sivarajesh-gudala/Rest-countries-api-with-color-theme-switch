import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { DarkModeService } from 'angular-dark-mode';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  toggleForm: FormGroup;
  darkMode$: Observable<boolean> = this.darkModeService.darkMode$;
  toggle: boolean = false;

  modeName: string = 'Dark Mode';
  item: boolean;
  constructor(
    private darkModeService: DarkModeService,
    private fb: FormBuilder
  ) {
    this.toggleForm = this.fb.group({
      slideme: false,
    });
  }
  ngOnInit(): void {
    this.toggleForm.get('slideme').valueChanges.subscribe((val) => {
      if (val === true) {
        this.toggle = true;
        this.modeName = 'Light Mode';
      } else {
        this.modeName = 'Dark Mode';
        this.toggle = false;
      }
    });
  }

  onToggle(e: MatCheckboxChange): void {
    this.darkModeService.toggle();
    this.toggle = !this.toggle;
    localStorage.setItem('toggleStatus', JSON.stringify(e.checked));
    this.item = JSON.parse(localStorage.getItem('toggleStatus'));
  }
}
