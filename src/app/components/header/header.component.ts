import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { DarkModeService } from 'angular-dark-mode';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class HeaderComponent implements OnInit {
  toggleForm: FormGroup;
  darkMode$ = this.darkModeService.darkMode$;
  toggle: boolean = false;

  modeName: string = 'Dark Mode';
  modeStatus: boolean;
  constructor(
    private darkModeService: DarkModeService,
    private fb: FormBuilder
  ) {
    this.toggleForm = this.fb.group({
      slideme: false,
    });
  }
  ngOnInit(): void {
    this.darkModeService.darkMode$.subscribe((val) => {
      this.modeStatus = val;
    });
  }

  onToggle(): void {
    this.darkModeService.toggle();
    this.toggle = !this.toggle;
  }
}
