import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { MeetingService } from 'src/app/service/meeting.service';

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

}
