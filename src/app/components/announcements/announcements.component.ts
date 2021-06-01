import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-announcements',
  templateUrl: './announcements.component.html',
  styleUrls: ['./announcements.component.css']
})

export class AnnouncementsComponent implements OnInit {

  announcements:Annoucement[] = [{title: "Announcement 1 test",content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum"}, {title:"Announcement 2", content:"Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Phasellus molestie ex at convallis luctus. Curabitur sit amet nunc eget justo scelerisque eleifend id a nibh."}]; 
  currentIndex: number = 0;
  currentAnnouncement:any = this.announcements[this.currentIndex];
  constructor() { 
  }

  ngOnInit(): void {

  }

  nextAnnouncement(){
    this.currentIndex+=1;
    if(this.currentIndex == this.announcements.length) {
      this.currentIndex = 0;
    }
    this.currentAnnouncement = this.announcements[this.currentIndex];
  }

  lastAnnouncement(){
    this.currentIndex = this.currentIndex-1;
    if(this.currentIndex < 0) {
      this.currentIndex = this.announcements.length-1;
    }
    this.currentAnnouncement = this.announcements[this.currentIndex];
  }

}

export interface Annoucement{
  title: string;
  content: string;
}
