import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-goals',
  templateUrl: './goals.component.html',
  styleUrls: ['./goals.component.css']
})
export class GoalsComponent implements OnInit {

  @Input() viewMode:any = null;
  constructor() { }

  ngOnInit(): void {
  }

}
