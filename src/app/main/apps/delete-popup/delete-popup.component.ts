import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-delete-popup',
  templateUrl: './delete-popup.component.html',
  styleUrls: ['./delete-popup.component.css']
})
export class DeletePopupComponent implements OnInit {

  constructor(private activeModal: NgbActiveModal,) { }

  ngOnInit(): void {
  }
  close() {
    this.activeModal.close();
  }
  submit() {
    this.activeModal.close('true');
  }
}
