import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MeetingService } from 'src/app/service/meeting.service';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent implements OnInit {

  id: string = ''

  constructor(
    private meetingService: MeetingService,
    public dialogRef: MatDialogRef<DeleteComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: string,
    private router: Router
  ) {
    this.id = data;
   }

  ngOnInit(): void {
  }

  cancel(){
    this.dialogRef.close(true);
  }

  delete(){
    this.meetingService.delete(this.id).subscribe(response => {
      console.log(response)
    },
    err => {
      console.log(err)
      console.log(err.headers)
    })
    this.dialogRef.close(true);
    window.location.reload();
  }
}
