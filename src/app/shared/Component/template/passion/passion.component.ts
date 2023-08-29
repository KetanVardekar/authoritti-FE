import { Component, Input, OnInit } from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CommonService } from 'src/app/shared/services/common.service';
import { DeletePopupComponent } from 'src/app/main/apps/delete-popup/delete-popup.component';
@Component({
  selector: 'app-passion',
  templateUrl: './passion.component.html',
  styleUrls: ['./passion.component.css']
})
export class PassionComponent implements OnInit {
  passionPayload = {
    'name': '',
    'description': '',
    'year': '',
  }
  name: any;
  description: any;
  year: any;
  passionDataList: any = []
  editIconFlag: boolean = false;
  addIconFlag: boolean = true;
  indexofData: any;
  @Input() viewMode:any = null;
  @Input() data:any = null;
  @Input()currentIndex:any =null;
  @Input()pageData:any =null;
  constructor(private toaster: ToastrService,
    private loader: NgxUiLoaderService,
    private modalService: NgbModal,
    private commonService: CommonService,) { }

  ngOnInit(): void {

    if(this.data.finalAnswer){
      this.passionDataList = this.data.finalAnswer
    }
  }

  addDetails() {
    this.passionPayload.name = this.name;
    this.passionPayload.description = this.description;
    this.passionPayload.year = this.year;

    if (this.passionPayload.name && this.passionPayload.description && this.passionPayload.year) {
      this.passionDataList.push({ ...this.passionPayload })
      this.data['finalAnswer'] = this.passionDataList;
      this.commonService.setPassionValue(this.passionDataList)
      this.year = '';
      this.name = '';
      this.description = '';
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
        this.passionDataList.splice(index, 1);
    this.data['finalAnswer'] = this.passionDataList;
      }
    })
  }
  // deleteData(index: any) {
  //   this.passionDataList.splice(index, 1);
  //   this.data['finalAnswer'] = this.passionDataList;
  // }
  editData(index: any) {
    this.editIconFlag = true;
    this.addIconFlag = false;
    this.indexofData = index;
    this.year = this.passionDataList[index].year;
    this.name = this.passionDataList[index].name;
    this.description = this.passionDataList[index].description;

  }
  updateDetails() {
    this.editIconFlag = false;
    this.addIconFlag = true;
    if(this.year && this.description && this.name){
    this.passionDataList[this.indexofData].year = this.year;
    this.passionDataList[this.indexofData].name = this.name;
    this.passionDataList[this.indexofData].description = this.description;
    this.data['finalAnswer'] = this.passionDataList;
    this.year = '';
    this.name = '';
    this.description = '';

    }
    else{
      this.toaster.warning('Please Fill All The Fields')
    }

  }
}
