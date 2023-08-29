import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  signUpPayload = {

    name:'',
    email:'',
    password:'',
    admin:false,
    active:false
  };
  showPasswordNew =false
  constructor(private router :Router,
    private authService: AuthService,
    private toaster: ToastrService,
    private loader: NgxUiLoaderService,) { }

  ngOnInit(): void {
  }
  showHidePasswordNew() {
    this.showPasswordNew
      ? (this.showPasswordNew = false)
      : (this.showPasswordNew = true);
  }
  signUp(){
    this.loader.start();
this.authService.signUp(this.signUpPayload).subscribe((res:any)=>{
  if (res.statusCode == 200){
    this.toaster.success(res.message);
    this.loader.stop();
    this.router.navigate(['/login'])
  }else{
    this.toaster.error(res.message);
    this.loader.stop();
  }
}, (error) => {
  this.toaster.error(error.error.message);
  this.loader.stop();
})
  }
  login(){
this.router.navigate(['/login'])
  }
}
