import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { User } from 'src/app/models/User';
import { UsersService } from 'src/app/services/users.service';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';
import { UserEditFormComponent } from '../user-edit-form/user-edit-form.component';

@Component({
  selector: 'app-user-administration',
  templateUrl: './user-administration.component.html',
  styleUrls: ['./user-administration.component.css']
})
export class UserAdministrationComponent implements AfterViewInit {

  USER_DATA: User[];
  displayedColumns: string[] = [ 'userId', 'userName' ,'firstName','lastName','emailAddress','role','enabled','actions'];
  dataSource: MatTableDataSource<User>;
  user: User = new User();
  newUser: User = new User();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  
  constructor(private userService: UsersService, public dialog: MatDialog, private snack: MatSnackBar) { }

  ngAfterViewInit(): void {
    this.getAllUsers()
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getAllUsers(){
    this.userService.getAllUsers().subscribe(data => {
      this.USER_DATA = data;
      this.dataSource = new MatTableDataSource(this.USER_DATA);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

  openEditDialog(user: User){
    let dialogRef = this.dialog.open(UserEditFormComponent, {
      width: '400px',
      height: '500px',
      data: user
      },
    );
  }

  // openDeleteDialog(user:User) : void{
  //   let dialogRef = this.dialog.open(DeleteDialogComponent, {
  //     width: '300px',
  //     height: '150px',
  //     data: {
  //       message: "Are you sure you want to delete " + user.firstName + " " + user.lastName +" and all books asociated?",
  //       buttonText:{
  //         ok:'Yes',
  //         cancel:'Cancel'
  //       }
  //     },
  //   });

  //   dialogRef.afterClosed().subscribe((confirmed: boolean) => {

  //     if(confirmed == true){
  //       this.userService.deleteUser(user.userId).subscribe(data => 
  //         {
  //           this.snack.open("User deleted", "Dismiss", {
  //             duration: 5000,
  //             verticalPosition: 'bottom',
  //             horizontalPosition: 'center'
  //           });
  //         })

  //         var index = this.USER_DATA.indexOf(user);
  //         this.USER_DATA.splice(index,1);
  //         this.dataSource._updateChangeSubscription()
  //     }
  //   });
  // }

  addNewUser(){
    
  }

  resetForm(userForm: NgForm){
    userForm.resetForm();
  }


}
