import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { AppListService } from '../../services/apps-list.service';
@Component({
  selector: 'app-table-drop-down-dynamic',
  templateUrl: './table-drop-down-dynamic.component.html',
  styleUrls: ['./table-drop-down-dynamic.component.css']
})
export class TableDropDownDynamicComponent implements OnInit {

  groupsList: any;
  appId: any;
  tabDropDownList: any = [];
  tableDropDownData: any = null;
  tableDropDownDataList: any;
  multiChoiceOfTableDropDown: any;
  obj2: any = {}
  elementOfObj: any
  value: any;
  keyvalue: any;
  id: any;
  ele: any
  copiedFinalAnswer: any
  multiChoiceList: any = []
  @Input() allPagesData: any = [];
  @Input() currentIndex: any = null;
  @Input() activePageData: any = null;

  @Output() gotoPreviousPage = new EventEmitter();

  constructor(private appsListService: AppListService,
    private toaster: ToastrService,
    private route: ActivatedRoute,
    private loader: NgxUiLoaderService,) { }

  ngOnInit(): void {


    this.route.params.subscribe((params: any) => {

      if (params && params.id) {
        this.id = params.id;

      }
    })

    this.tableDropDownDataList = this.activePageData.template.template.tableDropDown

    this.tableDropDownData = this.activePageData.template.template.tableDropDown

    let previousPage = this.allPagesData[this.currentIndex - 1];

    let slideArray: any = [];

    if (this.tableDropDownData.source == 'slider') {

      if ((this.tableDropDownData.finalAnswer && JSON.stringify(this.tableDropDownData.finalAnswer) !== '{}') && this.tableDropDownData.source == 'slider') {

        let filterValue = previousPage?.dynamic_question?.template?.template?.slider?.filterOn;
        previousPage?.dynamic_question?.template?.template?.slider?.finalAnswer.forEach((ele: any) => {

          let keys = Object.keys(this.tableDropDownData.finalAnswer);
          if (keys && keys.length) {
            for (const x of keys) {
              if (ele.score >= filterValue) {
                if (this.tableDropDownData.finalAnswer[x]) {
                  let index = this.tableDropDownData.finalAnswer[x].findIndex((x: any) => x.title == ele.title);
                  if (index != -1) {
                    slideArray.push(this.tableDropDownData.finalAnswer[x][index]);
                    return;
                  } else {
                    ele['groupName'] = ele['groupName'] ? ele['groupName'] : null;
                    slideArray.push(ele);
                    return;
                  }
                }
              }

            }

          }
        });

      } else if ((Object.keys(this.tableDropDownData.finalAnswer ? this.tableDropDownData.finalAnswer : {}).length == 0) && this.tableDropDownData.source == 'slider') {

        let filterValue = previousPage?.dynamic_question?.template?.template?.slider?.filterOn
        previousPage?.dynamic_question?.template?.template?.slider?.finalAnswer.forEach((ele: any) => {
          if (ele.score >= filterValue) {
            ele['groupName'] = null;
            slideArray.push(ele);
          }
        })

      }

      this.tabDropDownList = [...slideArray];

      this.tabDropDownList = this.tabDropDownList.sort((a: any, b: any) => parseFloat(b.score) - parseFloat(a.score));

      this.activePageData.template.template.tableDropDown['finalAnswer'] = this.groupBy(this.tabDropDownList, 'groupName', false);

    }


    this.route.params.subscribe((params: any) => {

      if (params) {
        this.appId = params.appId;
      }
    })

    //Multiple Choice

    let multichoiceArray: any = [];
    if (this.tableDropDownData.finalAnswer && this.tableDropDownData.finalAnswer.length && this.tableDropDownData.source == "multiChoiceGroup") {

      if (previousPage?.dynamic_question?.template?.template?.multipleChoice?.finalAnswer) {

        for (let key in previousPage?.dynamic_question?.template?.template?.multipleChoice?.finalAnswer) {

          let ele = previousPage?.dynamic_question?.template?.template?.multipleChoice?.finalAnswer[key];
          for (let value of ele) {

            let valid = true;
            for (let element of this.tableDropDownData.finalAnswer) {

              let keys = Object.keys(element);
              if (keys[0]) {

                let val = element[keys[0]];
                if (val.title == value.title) {
                  multichoiceArray.push({ [key]: val });
                  valid = false;
                }

              }

            }

            if (valid) {

              let invalid = false;
              for (let valueOfMain of multichoiceArray) {

                let key = Object.keys(valueOfMain)[0];
                if (key) {
                  if (valueOfMain[key]) {
                    if (value.title == valueOfMain[key].title) {
                      invalid = true;
                      return;
                    }
                  }
                }
              }

              if (!invalid) {
                multichoiceArray.push({ [key]: { title: value.title, rank: null } });
              }


            }

          }
        }

      }
      this.multiChoiceList = multichoiceArray;

      this.tableDropDownDataList.options = []
      this.multiChoiceList.forEach((element: any, i: any) => {
        this.tableDropDownDataList.options.push(i + 1);
      });

    } else if (!this.tableDropDownData.finalAnswer && this.tableDropDownData.source == "multiChoiceGroup") {

      if (previousPage?.dynamic_question?.template?.template?.multipleChoice) {
        this.multiChoiceOfTableDropDown = previousPage?.dynamic_question?.template?.template?.multipleChoice?.finalAnswer
        for (let key in this.multiChoiceOfTableDropDown) {
          this.elementOfObj = this.multiChoiceOfTableDropDown[key]
          for (let value of this.elementOfObj) {
            this.multiChoiceList.push({ [key]: { title: value.title, rank: null } })
          }
        }

        this.tableDropDownDataList.options = []
        this.multiChoiceList.forEach((element: any, i: any) => {
          this.tableDropDownDataList.options.push(i + 1);
        });

      }
    }
    // ------------
  }

  selectedGroup(event: any, i: number) {

    this.activePageData.template.template.tableDropDown['finalAnswer'] = this.groupBy(this.tabDropDownList, 'groupName', false);


  }

  selectedRank(event: any, i: number) {

    this.multiChoiceList.forEach((element: any) => {


      let key = Object.keys(element);
      if (key[0]) {

        if (event == element[key[0]].rank) {
          element[key[0]].rank = null;
        }

      }


    });

    let key = Object.keys(this.multiChoiceList[i]);
    if (key[0]) {
      this.multiChoiceList[i][key[0]].rank = event;
    }

    this.activePageData.template.template.tableDropDown['finalAnswer'] = this.multiChoiceList;
  }

  groupBy(objectArray: any, property: any, allowed: any) {
    return objectArray.reduce((acc: any, obj: any) => {
      const key = obj[property];
      if (key) {
        if (!acc[key]) {
          acc[key] = [];
        }
        // Add object to list for given key's value
        if (allowed) {
          if (obj.allowed)
            acc[key].push(obj);
        } else {
          acc[key].push(obj);
        }
      }

      return acc;
    }, {});
  }

}
