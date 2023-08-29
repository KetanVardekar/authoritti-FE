import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { CommonService } from 'src/app/shared/services/common.service';
import { UsersService } from 'src/app/shared/services/users.service';
import { DeletePopupComponent } from '../../apps/delete-popup/delete-popup.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  usersList: any
  list: any;
  title = 'Users List';
  constructor(private router: Router, private userService: UsersService, private toaster: ToastrService,
    private loader: NgxUiLoaderService,
    private modalService: NgbModal,private commonService:CommonService) { }

  ngOnInit(): void {

    this.commonService.setMainTitleToggle(this.title)
    this.getAllUser()
  }
  addUser() {
    this.router.navigate(['users/add'])
  }
  editUser(id: any) {

    if(id){
    this.router.navigate(['users/edit/' + id])

    }
  }
  getAllUser() {
this.loader.start();
    this.userService.getUsers().subscribe((res: any) => {

      this.usersList = res.data.filter((res: any) => {
        return res.admin == false
      })

    })
    this.loader.stop();
  }
  activeInactive(id: any, event: any) {
    this.loader.start()
    let payload = {

      active: event.target.checked
    }

    this.userService.updateUser(payload, id).subscribe((res: any) => {
      if (res) {
        this.toaster.success(res.message);
        this.loader.stop()
      } else {
        this.toaster.error(res.message);
        this.loader.stop()
      }
    }, (error) => {
      this.toaster.error(error);
      this.loader.stop();
    })
  }
  deleteUser(id:any){
    const modalRef = this.modalService.open(DeletePopupComponent, {
      size: 'l',
    })
    modalRef.result.then((result:any)=>{
      if(result){
        this.loader.start();
        this.userService.deleteUser(id).subscribe((res: any) => {
          if (res) {
            this.toaster.success(res.message);
            this.getAllUser();
            this.loader.stop();
          } else {
            this.toaster.error(res.message);
            this.loader.stop()
          }
        }, (error) => {
          this.toaster.error(error);
          this.loader.stop();
        })
      }
    })
  }
  // deleteUser(id: any) {
  //   this.loader.start();
  //   this.userService.deleteUser(id).subscribe((res: any) => {
  //     if (res) {
  //       this.toaster.success(res.message);
  //       this.getAllUser();
  //       this.loader.stop();
  //     } else {
  //       this.toaster.error(res.message);
  //       this.loader.stop()
  //     }
  //   }, (error) => {
  //     this.toaster.error(error);
  //     this.loader.stop();
  //   })
  // }
}
