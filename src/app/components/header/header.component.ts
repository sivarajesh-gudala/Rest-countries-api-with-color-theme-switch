import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { DarkModeService } from 'angular-dark-mode';
import { MatDialog } from '@angular/material/dialog';
import {
  ConfirmDialogComponent,
  ConfirmDialogModel,
} from '../header/confirm-dialog/confirm-dialog.component';

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

  constructor(
    private darkModeService: DarkModeService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.darkModeService.darkMode$.subscribe((val) => {
      this.modeStatus = val;
    });
  }

  /** Dark Mode */
  onToggle(): void {
    this.darkModeService.toggle();
  }

  /** Logout from the Website */
  signOut(): void {
    const message = `Are you sure you want to sign out?`;
    const dialogData = new ConfirmDialogModel('Confirm Action', message);

    this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '400px',
      data: dialogData,
      backdropClass: 'bdrop',
      disableClose: true,
    });
  }
}
