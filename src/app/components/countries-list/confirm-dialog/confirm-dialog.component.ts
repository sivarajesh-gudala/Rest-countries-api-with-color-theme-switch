import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss'],
})
export class ConfirmDialogComponent implements OnInit {
  title: string;
  message: string;
  constructor(
    public dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ConfirmDialogModel,
    private firebaseService: FirebaseService,
    private router: Router
  ) {
    this.title = data.title;
    this.message = data.message;
  }

  ngOnInit(): void {}
  signOut(): void {
    this.firebaseService.logout();
    this.dialogRef.close();
    this.router.navigate(['login']);
  }

  close(): void {
    this.dialogRef.close();
  }
}

export class ConfirmDialogModel {
  constructor(public title: string, public message: string) {}
}
