import { outputAst } from '@angular/compiler';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-questioner-dynamic',
  templateUrl: './questioner-dynamic.component.html',
  styleUrls: ['./questioner-dynamic.component.css']
})
export class QuestionerDynamicComponent implements OnInit {

  @Input() data: any = null;
  @Input() pageData: any = null;
  @Input() currentIndex: any = null;
  @Input() viewMode:any = null;

  @Output() backToStart = new EventEmitter();

  constructor(private toaster: ToastrService) { }

  ngOnInit(): void {

  }

  gotoPreviousPage(event: any) {
    this.backToStart.emit(event);
  }

}
