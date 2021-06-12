import { Component, OnInit } from '@angular/core';
import announcements from 'src/app/data/announcements.json'
import { User } from 'src/app/models/User';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-announcements',
  templateUrl: './announcements.component.html',
  styleUrls: ['./announcements.component.css']
})

export class AnnouncementsComponent implements OnInit {

  announcementArray:Announcement[];
  currentIndex: number = 0;
  currentAnnouncement:Announcement;
  editing : boolean = false;
  currentUser: User;
  
  constructor(private authenticationService: AuthenticationService) { 
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }

  ngOnInit(): void {
    this.getAnnouncementData();
    this.currentAnnouncement = this.announcementArray[this.currentIndex];
  }

  nextAnnouncement(){
    this.currentIndex+=1;
    if(this.currentIndex == this.announcementArray.length) {
      this.currentIndex = 0;
    }
    this.currentAnnouncement = this.announcementArray[this.currentIndex];
  }

  lastAnnouncement(){
    this.currentIndex = this.currentIndex-1;
    if(this.currentIndex < 0) {
      this.currentIndex = this.announcementArray.length-1;
    }
    this.currentAnnouncement = this.announcementArray[this.currentIndex];
  }

  addNewAnnouncement(){
    var an: Announcement = {
      title:"",
      content:""
    };

    this.announcementArray.push(an);
    this.currentAnnouncement = this.announcementArray[this.announcementArray.length-1];
    this.currentIndex = this.announcementArray.length-1;
    this.editing = true;
  }

  getAnnouncementData(){
    this.announcementArray = announcements;
  }

  enableEditing(){
    this.editing = !this.editing;
    if (this.currentIndex == this.announcementArray.length-1 && (this.currentAnnouncement.title == "" || this.currentAnnouncement.content == "")){
      this.deleteAnnouncement();
    }
  }

  saveEdit(){
    this.announcementArray[this.currentIndex].content = this.currentAnnouncement.content;
    this.announcementArray[this.currentIndex].title = this.currentAnnouncement.title;
    this.editing = false;
  }

  deleteAnnouncement(){
    this.announcementArray.splice(this.currentIndex,1);
    this.currentIndex = 0;
    if(this.announcementArray.length == 0){
      var an: Announcement = {
        title:"No announcements for now",
        content:""
      };
      this.announcementArray.push(an);
    }
    this.currentAnnouncement = this.announcementArray[this.currentIndex];
  }

}

export interface Announcement{
  title: string;
  content: string;
}
