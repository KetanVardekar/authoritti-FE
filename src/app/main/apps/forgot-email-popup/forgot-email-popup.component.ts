import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-forgot-email-popup',
  templateUrl: './forgot-email-popup.component.html',
  styleUrls: ['./forgot-email-popup.component.css']
})
export class ForgotEmailPopupComponent implements OnInit {
  emailId:any
  constructor(private activeModal: NgbActiveModal,
    private toaster: ToastrService,) { }

  ngOnInit(): void {
  }
  close() {
    this.activeModal.close();
  }
  submit() {
   if(this.emailId){
      if(this.emailId.trim()){
        this.activeModal.close(this.emailId)
      }else{
        this.toaster.warning('Enter Email')
      }
    }else{
      this.toaster.warning('Enter Email')
    }
  }
}
