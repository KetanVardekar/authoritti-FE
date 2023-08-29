import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { AppService } from 'src/app/shared/services/app.service';
import { CommonService } from 'src/app/shared/services/common.service';
@Component({
  selector: 'app-report-popup',
  templateUrl: './report-popup.component.html',
  styleUrls: ['./report-popup.component.css']
})
export class ReportPopupComponent implements OnInit {
  uniqueName: any;
  title = '';
  @Input() appTitle: any;
  constructor(private activeModal: NgbActiveModal,
    private toaster: ToastrService,
  ) { }

  ngOnInit(): void {
  }
  close() {
    this.activeModal.close();
  }

  submit() {
    if (this.uniqueName) {
      if (this.uniqueName.trim()) {
        this.activeModal.close(this.uniqueName);
      }else{
        this.toaster.warning('Enter Unique Name');
      }
    } else {

      this.toaster.warning('Enter Unique Name');

    }
  }
}
