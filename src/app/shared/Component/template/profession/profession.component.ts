import { Component, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AppListService } from 'src/app/shared/services/apps-list.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
import { CommonService } from 'src/app/shared/services/common.service';
import { DeletePopupComponent } from 'src/app/main/apps/delete-popup/delete-popup.component';

@Component({
  selector: 'app-profession',
  templateUrl: './profession.component.html',
  styleUrls: ['./profession.component.css']
})
export class ProfessionComponent implements OnInit {
  professionPayload = {
    'year': '',
    'companyName': '',
    'jobTitle': '',
    'duration': ''

  }
  year: any;
  companyName: any;
  jobTitle: any;
  duration: any
  professionDataList: any = []

  editIconFlag: boolean = false;
  addIconFlag: boolean = true;
  indexofData: any;

  @Input() viewMode:any = null;
  @Input() data:any = null;
  @Input()currentIndex:any =null;
  @Input()pageData:any =null;
  constructor(
    private route: ActivatedRoute,
    private commonService: CommonService,
    private modalService: NgbModal,
    private toaster: ToastrService,
    private loader: NgxUiLoaderService,
  ) { }

  ngOnInit(): void {

    if(this.data.finalAnswer){
      this.professionDataList = this.data.finalAnswer
    }
  }

  addDetails() {
    this.professionPayload.year = this.year;
    this.professionPayload.companyName = this.companyName;
    this.professionPayload.duration = this.duration;
    this.professionPayload.jobTitle = this.jobTitle
    if (this.professionPayload.year && this.professionPayload.companyName && this.professionPayload.duration && this.professionPayload.jobTitle) {
      this.professionDataList.push({ ...this.professionPayload })
      this.data['finalAnswer'] = this.professionDataList;
      this.commonService.setProfessionValue(this.professionDataList)

      this.year = '';
      this.companyName = '';
      this.duration = '';
      this.jobTitle = '';
    } else {
      this.toaster.warning('Please Fill All The Fields')
    }

  }
  deleteData(index:any){
    const modalRef = this.modalService.open(DeletePopupComponent, {
      size: 'l',
    })
    modalRef.result.then((result:any)=>{
      if(result){
        this.professionDataList.splice(index, 1)
        this.data['finalAnswer'] = this.professionDataList
        this.commonService.setProfessionValue(this.professionDataList)
      }
    })
  }
  // deleteData(index: any) {
  //   this.professionDataList.splice(index, 1)
  //   this.data['finalAnswer'] = this.professionDataList
  //   this.commonService.setProfessionValue(this.professionDataList)
  // }
  editData(index: any) {
    this.editIconFlag = true;
    this.addIconFlag = false;
    this.indexofData = index;
    this.year = this.professionDataList[index].year;
    this.companyName = this.professionDataList[index].companyName;
    this.duration = this.professionDataList[index].duration;
    this.jobTitle = this.professionDataList[index].jobTitle;

  }
  updateDetails() {

    if(this.year && this.companyName && this.duration && this.jobTitle){
      this.editIconFlag = false;
    this.addIconFlag = true;
    this.professionDataList[this.indexofData].year = this.year;
    this.professionDataList[this.indexofData].companyName = this.companyName;
    this.professionDataList[this.indexofData].duration = this.duration;
    this.professionDataList[this.indexofData].jobTitle = this.jobTitle;

    this.data['finalAnswer'] = this.professionDataList;
    this.commonService.setProfessionValue(this.professionDataList)
    this.year = '';
    this.companyName = '';
    this.duration = '';
    this.jobTitle = '';
    }else{
      this.toaster.warning('Please Fill All The Fields')
    }
  }
}
