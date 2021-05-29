import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { DarkModeService } from 'angular-dark-mode';
import { Observable } from 'rxjs';
import { ThemeService } from 'src/app/theme/theme.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  // toggleForm: FormGroup;
  // darkMode$: Observable<boolean> = this.darkModeService.darkMode$;
  toggle: boolean = false;

  modeName: string = 'Dark Mode';
  item: boolean;
  constructor(
    private darkModeService: DarkModeService,
    private themeService: ThemeService,
    private fb: FormBuilder
  ) {
    // this.toggleForm = this.fb.group({
    //   slideme: false,
    // });
  }
  ngOnInit(): void {
    // this.toggleForm.get('slideme').valueChanges.subscribe((val) => {
    //   if (val === true) {
    //     this.toggle = true;
    //     this.modeName = 'Light Mode';
    //   } else {
    //     this.modeName = 'Dark Mode';
    //     this.toggle = false;
    //   }
    // });
  }

  onToggle(): void {
    const active = this.themeService.getActiveTheme();
    if (active.name === 'light') {
      this.themeService.setTheme('dark');
    } else {
      this.themeService.setTheme('light');
    }
  }
}
