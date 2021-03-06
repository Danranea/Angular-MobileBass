import { Component, Inject, OnInit, Optional } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MeetingService } from 'src/app/service/meeting.service';

@Component({
  selector: 'app-meeting-form',
  templateUrl: './meeting-form.component.html',
  styleUrls: ['./meeting-form.component.css']
})
export class MeetingFormComponent implements OnInit {

  public meetingForm!: FormGroup;

  public idEdit: string = '';

  constructor(
    private meetingService: MeetingService,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<MeetingFormComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: string
  ) {
    this.idEdit = data;
   }

  ngOnInit(): void {
    this.meetingForm = this.fb.group({
      id: [null],
      meetingName: ['', Validators.required],
      meetingSubject: ['', Validators.required],
      meetingResponsible: ['', Validators.required],
      meetingDate: ['', Validators.required],
      meetingTime: ['', Validators.required],
    })

    if (this.idEdit !== null) {
      this.getById(this.idEdit);
    }
  }

  getById(idEdit: string){
    this.meetingService.getById(idEdit).subscribe((response: any) => {
      this.meetingForm = this.fb.group({
        id: [response['id']],
        meetingName: [response['meetingName'], Validators.required],
        meetingSubject: [response['meetingSubject'], Validators.required],
        meetingResponsible: [response['meetingResponsible'], Validators.required],
        meetingDate: [response['meetingDate'], Validators.required],
        meetingTime: [response['meetingTime'], Validators.required],
      })
    }, err => {
      console.log("Err", err)
    })    
  }

  cancel(): void {
    this.dialogRef.close();
  }

  save( ): void{
    if (this.meetingForm.value.id === null) {
      this.create();
    } else {
      this.update();
    }
  }

  create(): any{
    this.meetingService.insert(this.meetingForm.value).subscribe(response => {
      console.log("Meeting", response)
    }, err => {
      console.log("Err", err)
    })
    this.dialogRef.close(true);
    this.meetingForm.reset();
    window.location.reload();
  }

  update(){
    this.meetingService.update(this.meetingForm.value).subscribe((response: any) => {
      console.log("Meeting", response)
    }, err => {
      console.log("Err", err)
    })
    this.dialogRef.close(true);
    this.meetingForm.reset();
    window.location.reload();
  }
}
