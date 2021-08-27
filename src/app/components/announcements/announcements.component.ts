import { Component, OnInit } from '@angular/core';
import { Announcement } from 'src/app/models/Announcement';
import { User } from 'src/app/models/User';
import { AnnouncementsService } from 'src/app/services/announcements.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { SnackBarService } from 'src/app/services/snack-bar.service';

@Component({
  selector: 'app-announcements',
  templateUrl: './announcements.component.html',
  styleUrls: ['./announcements.component.css']
})

export class AnnouncementsComponent implements OnInit {

  announcementArray:Announcement[];
  currentIndex: number = 0;
  currentAnnouncement:Announcement = new Announcement;
  editing : boolean = false;
  currentUser: User;
  
  constructor(private authenticationService: AuthenticationService, private annnouncementsService: AnnouncementsService, private snack: SnackBarService) { 
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    this.getAnnouncementData();
  }

  ngOnInit(): void {
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
      announcementId: null,
      title:"",
      content:""
    };

    this.announcementArray.push(an);
    this.currentAnnouncement = this.announcementArray[this.announcementArray.length-1];
    this.currentIndex = this.announcementArray.length-1;
    this.editing = true;
  }

  getAnnouncementData(){
     this.annnouncementsService.getAllAnnouncements().subscribe(data => {
      this.announcementArray = data;
      this.currentAnnouncement = this.announcementArray[this.currentIndex];
      if(data.length == 0 ){
        var an: Announcement = {
          announcementId: null,
          title:"No announcements for now",
          content:""
        };
        this.announcementArray.push(an);
        this.currentAnnouncement = this.announcementArray[this.currentIndex];
      }
     });
  }

  enableEditing(){
    this.editing = !this.editing;
    if (this.currentIndex == this.announcementArray.length-1 && (this.currentAnnouncement.title == "" || this.currentAnnouncement.content == "")){
      this.deleteAnnouncement();
    }
  }

    async saveEdit(){
    this.announcementArray[this.currentIndex].content = this.currentAnnouncement.content;
    this.announcementArray[this.currentIndex].title = this.currentAnnouncement.title;
    this.announcementArray[this.currentIndex].announcementId = this.currentAnnouncement.announcementId;

    if(this.currentAnnouncement.announcementId == null){
      await this.annnouncementsService.createAnnouncement(this.currentAnnouncement).catch(error => {
      })
    }
    else{
      await this.annnouncementsService.updateAnnouncement(this.currentAnnouncement).catch(error => {
      });
    }
    this.getAnnouncementData();
    
    this.editing = false;
  }

  deleteAnnouncement(){
    this.annnouncementsService.deleteAnnouncement(this.announcementArray[this.currentIndex].announcementId).subscribe(data => {
      this.snack.showSnackBar("Announcement deleted");
    })
    this.announcementArray.splice(this.currentIndex,1);
    this.currentIndex = 0;
    if(this.announcementArray.length == 0){
      var an: Announcement = {
        announcementId: null,
        title:"No announcements for now",
        content:""
      };
      this.announcementArray.push(an);
    }
    this.currentAnnouncement = this.announcementArray[this.currentIndex];
  }

}