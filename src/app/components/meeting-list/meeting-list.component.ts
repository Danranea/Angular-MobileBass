import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import * as moment from 'moment';
import { MeetingService } from 'src/app/service/meeting.service';
import { DeleteComponent } from '../delete/delete.component';
import { MeetingFormComponent } from '../meeting-form/meeting-form.component';

@Component({
  selector: 'app-meeting-list',
  templateUrl: './meeting-list.component.html',
  styleUrls: ['./meeting-list.component.css']
})
export class MeetingListComponent implements OnInit {

  displayedColumns: string[] = ['meetingName', 'meetingSubject', 'meetingResponsible', 'meetingDate', 'meetingTime', 'actions'];
  meetings = [];

  length: number = 0;
  totalRecordsPerPage: number = 5;
  meetingNameFind: string = '';
  meetingDateFind: string = '';

  constructor(public dialog: MatDialog, private meetingService: MeetingService) { }

  ngOnInit(): void {
    this.findAll(0, 'meetingDate', '')
  }

  findByParameter(){
    let filter = '';

    if (this.meetingNameFind !== null && this.meetingNameFind !== '') {
      filter += 'meetingName=' + this.meetingNameFind
    }

    if (this.meetingDateFind !== null) {
      if (filter !== '') {
        filter += ':'
      }
      let newDate: moment.Moment = moment.utc(this.meetingDateFind).local();
      filter += 'meetingDate=' + newDate.format('YYYY-MM-DDTMM:mm:ss') + '.0002';
    }
    this.findAll(0, 'meetingDate', filter)
  }

  findAll(pageNumber: number, sortField: string, filter: string){
    this.meetingService.getAll(pageNumber, this.totalRecordsPerPage, sortField, filter).subscribe((meetingsReturn: any) => {
      this.meetings = meetingsReturn['meeting'];
      this.length = meetingsReturn['page'].size
    },
    err => {
      console.log(err)
      console.log(err.headers)
    });
  }

  getServerData(event: PageEvent){
    this.findAll(event.pageIndex, 'meetingDate', '')
  }

  edit(id: string){
    const dialogRef = this.dialog.open(MeetingFormComponent, {
      width: '500px',
      data: id
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  delete(id: number) {
    const dialogRef = this.dialog.open(DeleteComponent, {
      width: '500px',
      data: id
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

}
