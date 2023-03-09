import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { User } from '../models/user.model';
import { ApiService } from '../services/api.service';
@Component({
  selector: 'app-registration-list',
  templateUrl: './registration-list.component.html',
  styleUrls: ['./registration-list.component.scss']
})
export class RegistrationListComponent implements AfterViewInit , OnInit{
 public dataSource!: MatTableDataSource<User>;
 public users!:  User[];
 displayedColumns:string[] = ['id','firstName','lastName','email','mobile','bmiResult','gender','package','enquiryDate','action'];
 @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(private api:ApiService){

  }
  ngOnInit(): void {
    this.getUser()
  }
  getUser(){
    this.api.getRegisterUser()
    .subscribe({next:(res)=>{
      this.users = res;
       this.dataSource = new MatTableDataSource(this.users);
       this.dataSource.paginator = this.paginator;
       this.dataSource.sort = this.sort;

    },
      error:(e)=>console.log("somthing went wrong",e)}
    )
  }
  ngAfterViewInit() {
    //this.dataSource.paginator = this.paginator;
    //this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
