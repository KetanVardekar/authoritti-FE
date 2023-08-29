import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { UsersService } from 'src/app/shared/services/users.service';
import { AppService } from 'src/app/shared/services/app.service';
import { addEditUser } from 'src/app/shared/models/user';
import { CommonService } from 'src/app/shared/services/common.service';

@Component({
  selector: 'app-add-edit-users',
  templateUrl: './add-edit-users.component.html',
  styleUrls: ['./add-edit-users.component.css']
})
export class AddEditUsersComponent implements OnInit {
  usersignUpPayload: addEditUser = new addEditUser();
  formSubmitted = false;
  showPasswordNew = false
  idOfUser: any
  appsList: any;
  title = '';
  constructor(private router: Router, private authService: AuthService,
    private toaster: ToastrService,
    private loader: NgxUiLoaderService,
    private usersService: UsersService,
    private route: ActivatedRoute,
    private appService: AppService,
    private commonService: CommonService) { }

  ngOnInit(): void {

    this.getAppData();
    this.route.params.subscribe((params: any) => {

      if (params && params.id) {
        this.idOfUser = params.id;
        this.title = 'Edit User';
      } else {
        this.title = 'Add User';
      }

      this.commonService.setMainTitleToggle(this.title);

    })


  }
  getAppData() {
    this.loader.start();
    this.appService.getAllApps().subscribe((res: any) => {
      this.appsList = res.data;
      this.appsList = this.appsList.filter((v: any) => v.active);

      this.appsList.forEach((ele: any) => {
        ele['checked'] = false;
      })

      if (this.idOfUser) {
        this.geUpdateData();
      } else {
        this.loader.stop();
      }
    })
  }
  geUpdateData() {

    this.usersService.getUserById(this.idOfUser).subscribe((res: any) => {

      this.usersignUpPayload.name = res.data.name;
      this.usersignUpPayload.email = res.data.email;
      this.usersignUpPayload.password = res.data.password;
      this.usersignUpPayload.numberOfReports = res.data.numberOfReports;
      this.usersignUpPayload.permissions = res.data.permissions;


      this.usersignUpPayload.permissions.forEach((ele: any) => {

        let app = this.appsList.find((v: any) => ele == v._id);
        if (app) {
          app.checked = true;
        }
      })
      this.loader.stop();
    })

  }
  showHidePasswordNew() {
    this.showPasswordNew
      ? (this.showPasswordNew = false)
      : (this.showPasswordNew = true);
  }
  submit() {
    this.formSubmitted = true;
    this.loader.start();
    if (this.usersignUpPayload.name.length && this.usersignUpPayload.email && this.usersignUpPayload.numberOfReports && this.usersignUpPayload.password) {
      if (this.usersignUpPayload.numberOfReports >= 0) {
        this.usersService.addUser(this.usersignUpPayload).subscribe((res: any) => {
          if (res.statusCode == 200) {
            this.toaster.success(res.message);
            this.loader.stop();
            this.router.navigate(['/users'])
          } else {
            this.toaster.error(res.message);
            this.loader.stop();

          }
        }, (error) => {
          this.toaster.error(error.error.message);
          this.loader.stop();
        })
      } else {
        this.toaster.warning('Enter Positive Value')
        this.loader.stop();
      }
    } else {
      this.toaster.error('Please fill all the fields');
      this.loader.stop();
    }

  }

  cancel() {
    this.router.navigate(['users']);
  }

  changeOfView(i: any, id: any, event: any) {

    if (event.target.checked === true) {
      this.usersignUpPayload.permissions.push(id)
    } else {
      if (this.usersignUpPayload.permissions.includes(id)) {
        let index = this.usersignUpPayload.permissions.findIndex((v: any) => v == id);
        this.usersignUpPayload.permissions.splice(index, 1);
      }

    }

  }
  update() {
    this.loader.start();
    let payload = {
      permissions: this.usersignUpPayload.permissions,
      numberOfReports: this.usersignUpPayload.numberOfReports

    }
if(this.usersignUpPayload.numberOfReports>=0){
    this.usersService.updateUser(payload, this.idOfUser).subscribe((res: any) => {
      if (res.statusCode == 200) {

        this.toaster.success(res.message);
        this.loader.stop();
        this.router.navigate(['/users'])

      } else {
        this.toaster.error(res.message);
        this.loader.stop();
      }
    }, (error) => {
      this.toaster.error(error);
      this.loader.stop();
    })}else{
      this.toaster.warning('Enter Positive Value')
      this.loader.stop();
    }
  }
}
