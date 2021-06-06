import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatCardModule} from '@angular/material/card';
import {MatTabsModule} from '@angular/material/tabs';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import {FormsModule} from '@angular/forms';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import {MatSelectModule} from '@angular/material/select';
import {ReactiveFormsModule} from '@angular/forms';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { MatSelectFilterModule } from 'mat-select-filter';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatDividerModule} from '@angular/material/divider';
import {MatSortModule} from '@angular/material/sort';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatRadioModule} from '@angular/material/radio';
import {MatCheckboxModule} from '@angular/material/checkbox';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { AdminComponent } from './components/admin/admin.component';
import { BooksComponent } from './components/books/books.component';
import { AuthorsComponent } from './components/authors/authors.component';
import { ReviewsComponent } from './components/reviews/reviews.component';
import { BooksTableComponent } from './components/books-table/books-table.component';
import { BookEditFormComponent } from './components/book-edit-form/book-edit-form.component';
import { AuthorsTableComponent } from './components/authors-table/authors-table.component';
import { CacheService } from './services/cache.service';
import { CachingInterceptor } from 'src/app/interceptors/CacheInterceptor';
import { DeleteDialogComponent } from './components/delete-dialog/delete-dialog.component';
import { UserbookstableComponent } from './components/userbookstable/userbookstable.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { RequestsComponent } from './components/requests/requests.component';
import { UserprofileComponent } from './components/userprofile/userprofile.component';
import { ShoppingcartComponent } from './components/shoppingcart/shoppingcart.component';
import { AnnouncementsComponent } from './components/announcements/announcements.component';
import { LoginComponent } from './components/login/login.component';
import { ErrorInterceptor } from './interceptors/ErrorInterceptor';
import { JwtInterceptor } from './interceptors/JwtInterceptor';
import { RegisterComponent } from './components/register/register.component';
import { RequestAdministrationComponent } from './components/request-administration/request-administration.component';
import { UserAdministrationComponent } from './components/user-administration/user-administration.component';
import { AuthorEditFormComponent } from './components/author-edit-form/author-edit-form.component';
import { UserEditFormComponent } from './components/user-edit-form/user-edit-form.component';
import {MatExpansionModule} from '@angular/material/expansion'


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AdminComponent,
    BooksComponent,
    AuthorsComponent,
    ReviewsComponent,
    BooksTableComponent,
    BookEditFormComponent,
    AuthorsTableComponent,
    DeleteDialogComponent,
    LoginComponent,
    UserbookstableComponent,
    HomepageComponent,
    RequestsComponent,
    UserprofileComponent,
    ShoppingcartComponent,
    AnnouncementsComponent,
    RegisterComponent,
    RequestAdministrationComponent,
    UserAdministrationComponent,
    AuthorEditFormComponent,
    UserEditFormComponent,
  ],
  entryComponents:[
    BookEditFormComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatTabsModule,
    NgbModule,
    MatTableModule,
    MatInputModule,
    MatPaginatorModule,
    MatButtonModule,
    MatDialogModule,
    FormsModule,
    HttpClientModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    MatSelectFilterModule,
    MatProgressSpinnerModule,
    MatSidenavModule,
    MatDividerModule,
    MatSortModule,
    MatTooltipModule,
    MatRadioModule,
    MatCheckboxModule,
    MatExpansionModule
  ],
  providers: [
    CacheService,
    {provide: HTTP_INTERCEPTORS, useClass: CachingInterceptor, multi: true},
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
