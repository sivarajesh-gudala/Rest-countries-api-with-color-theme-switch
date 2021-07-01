import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {
  ConfirmDialogComponent,
  ConfirmDialogModel,
} from '../header/confirm-dialog/confirm-dialog.component';
import { DarkModeService } from 'angular-dark-mode';
import { SharedService } from 'src/app/services/shared.service';
import { RoutePath } from '../../shared/enums/route-path.enum';
import { NavLinks } from 'src/app/shared/interfaces/navlinks.interface';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class HeaderComponent implements OnInit {
  nav: NavLinks[] = [
    {
      link: RoutePath.ALLCOUNTRIES,
      name: 'Where in the world?',
      exact: true,
      tooltip: 'All countries in the World',
    },

    {
      link: RoutePath.IPADDRESS,
      name: 'IP Address Tracker',
      exact: false,
      tooltip: 'Get Location based on IP Address',
    },
  ];
  darkMode$ = this.darkModeService.darkMode$;
  modeName: string = 'Dark Mode';
  modeStatus: boolean;
  userName: string;
  isShown: boolean = false;

  constructor(
    private dialog: MatDialog,
    private darkModeService: DarkModeService,
    private sharedService: SharedService
  ) {}

  ngOnInit(): void {
    this.getUserInfo();
    this.getDarkModeStatus();
  }

  /** Getting Dark theme status */
  getDarkModeStatus(): void {
    this.darkModeService.darkMode$.subscribe((val) => {
      this.modeStatus = val;
    });
  }

  /** Get User Name */
  getUserInfo() {
    let userDetails = JSON.parse(localStorage.getItem('user-details'));
    this.userName = this.sharedService.capitalizeFirstLetter(
      userDetails?.displayName
    );
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
