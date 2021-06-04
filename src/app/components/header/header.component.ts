import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { DarkModeService } from 'angular-dark-mode';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class HeaderComponent implements OnInit {
  darkMode$ = this.darkModeService.darkMode$;
  modeName: string = 'Dark Mode';
  modeStatus: boolean;

  constructor(private darkModeService: DarkModeService) {}

  ngOnInit(): void {
    this.darkModeService.darkMode$.subscribe((val) => {
      this.modeStatus = val;
    });
  }

  onToggle(): void {
    this.darkModeService.toggle();
  }
}
