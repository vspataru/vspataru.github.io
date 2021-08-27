import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Announcement } from '../models/Announcement';
import { mergeMap, delay, takeUntil } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AnnouncementsService {

  baseUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getAllAnnouncements(){

    return this.http.get<Announcement[]>(this.baseUrl+"/announcements");
  }

  deleteAnnouncement(announcementId: number){
    return this.http.delete(this.baseUrl+"/announcements/"+announcementId);
  }

    async updateAnnouncement(announcement: Announcement){

    let response = await this.http.put<any>(this.baseUrl + "/announcements", announcement).toPromise();

    return response;
  }

    async createAnnouncement(announcement: Announcement){
      let response =   await this.http.post<any>(this.baseUrl + "/announcements", announcement,).toPromise();
    return response;
  }



}
