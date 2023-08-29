import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  newPassword: any;
  emailId: any;
  payload = {
    emailId: '',
    newPassword: '',
  }
  showPasswordNew = false;
  constructor(private toaster: ToastrService,
    private router: Router,
    private authService: AuthService,
    private route: ActivatedRoute,
    private loader: NgxUiLoaderService,) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: any) => {
      this.payload.emailId = params.emailId
    })
  }
  submit() {
    if (this.payload.emailId && this.payload.newPassword) {
      if (this.payload.emailId.trim() && this.payload.newPassword.trim()) {
        let payload = {
          email: this.payload.emailId,
          password: this.payload.newPassword
        }
        this.authService.updateForgotPassword(payload).subscribe((res: any) => {
          if (res.statusCode == 200) {
            this.router.navigate(['/login'])
            this.toaster.success(res.message);
            this.loader.stop();
          } else {
            this.toaster.error(res.message);
            this.loader.stop();
          }
        }, (error) => {
          this.toaster.error(error.error.message);
          this.loader.stop();
        })
      } else {
        this.toaster.warning('Enter all Required Fields !')
      }
    } else {
      this.toaster.warning('Enter all Required Fields !')
    }
  }
  showHidePasswordNew() {
    this.showPasswordNew
      ? (this.showPasswordNew = false)
      : (this.showPasswordNew = true);
  }
}
