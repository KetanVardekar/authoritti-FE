import { Component, OnInit } from '@angular/core';
import { Form, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ForgotEmailPopupComponent } from 'src/app/main/apps/forgot-email-popup/forgot-email-popup.component';
import { AuthService } from 'src/app/shared/services/auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginPayload = {
    email: '',
    password: ''
  };
  formSubmitted = false;
  showPasswordNew = false
  constructor(private authService: AuthService,
    private toaster: ToastrService,
    private modalService: NgbModal,
    private loader: NgxUiLoaderService,
    private router: Router) {

     }

  ngOnInit(): void {

  }
  showHidePasswordNew() {
    this.showPasswordNew
      ? (this.showPasswordNew = false)
      : (this.showPasswordNew = true);
  }
  signUp() {
    this.router.navigate(['/signup'])
  }

  submit() {
    this.formSubmitted = true;

    this.loader.start();
    this.authService.login(this.loginPayload).subscribe((res: any) => {
      if (res.statusCode == 200) {
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('userData', JSON.stringify(res.data.user));
        this.toaster.success(res.message);
        this.loader.stop();
        this.router.navigate(['']);

      } else {
        this.toaster.error(res.message);
        this.loader.stop();
      }
    }, (error) => {
      this.toaster.error(error.error.message);
      this.loader.stop();
    });
  }
  forgotPasswordData() {
    const modalRef = this.modalService.open(ForgotEmailPopupComponent, {
      size: 'l',
    })
    modalRef.result.then((emailId: any) => {

      if (emailId) {

        let payload = {
          email: emailId,
          redirecturl: `${environment.emailUrl}/` + emailId + "/forgot-password"
        }
        this.authService.forgotPassword(payload).subscribe((res: any) => {
          if (res.statusCode == 200) {
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
      }
    })
  }
}

