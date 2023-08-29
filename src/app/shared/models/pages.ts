
// ----------------------INtro----------------
export class intro {

  active: boolean;
  title: string;
  description: string;
  videolink: string;
  icon: boolean;
  constructor() {

    this.active = false;
    this.title = '';
    this.description = '';
    this.videolink = '';
    this.icon = false;
  }

}
// ----------------------Section---------------
export class section {
  active: boolean;
  title: string;
  constructor() {
    this.active = false;
    this.title = '';
  }

}
// --------------questionnarie--------------
export class questionnarie {
  active: boolean;
  title: string;
  description: string;
  categories: any;
  group: any;
  tag:any;
  hideTitle: boolean;
  multiColLayout: boolean;
  overrideNextBtn: boolean;
  questions:any [];
  constructor() {
    this.active = false;
    this.title = '';
    this.description = '';
    this.categories = null;
    this.group = null;
    this.tag =null;
    this.questions = [];
    this.hideTitle = false;
    this.multiColLayout = false;
    this.overrideNextBtn = false;
  }
}



export class multipleChoice {
  title: string;
  description: string;
  divideInGroups: boolean;
  maxAnswerCount: any;
  options:any=[];
  constructor() {
    this.title = '';
    this.description = '';
    this.divideInGroups = false;
    this.maxAnswerCount = null;
    this.options = [];

  }
}
export class multiTextInput {
  active: boolean;
  title: string;
  description: string;
  placeholder: PlaceHolderClass[];
  constructor() {
    this.active = false;
    this.title = '';
    this.description = '';
    this.placeholder = [{ ...new PlaceHolderClass()  }];
  }
}

export class PlaceHolderClass{

  placeholder:string;


  constructor(){
    this.placeholder = '';

  }
}
export class singleChoice {
  title: string;
  description: string;
  options:any=[];
  other: boolean;
  constructor() {
    this.title = '';
    this.description = '';
    this.options = [];
    this.other = false;
  }
}
export class slider {

  title: string;
  description: string;
  minVal: any;
  maxVal: any;
  defaultAnswer: any;
  minValLabel: string;
  maxValLabel: string;
  tag:any=[];
  constructor() {
    this.title = '';
    this.description = '';
    this.minVal = null;
    this.maxVal = null;
    this.defaultAnswer = null;
    this.minValLabel = '';
    this.maxValLabel = '';
    this.tag = [];
  }





}
export class textArea {

  title: string;
  description: string;
  placeholder: string;
  constructor() {
    this.title = '';
    this.description = '';
    this.placeholder = '';
  }
}
export class textInput {
  title: string;
  description: string;
  placeholder: string;
  constructor() {
    this.title = '';
    this.description = '';
    this.placeholder = '';
  }
}

// -----------------questioner Dynamic-------------
export class questionnarieDynamic {
  active: boolean;
  title: string;
  description: string;
  group: any;
  template:any;
  constructor() {
    this.active = false;
    this.title = '';
    this.description = '';
    this.group = null;
    this.template = null;
  }
}
export class multiChoiceGroup {
  source: any;
  maxAnswerCount: number;
  minAnswerCount: number;
  constructor() {
    this.source = null;
    this.maxAnswerCount = 0;
    this.minAnswerCount = 0;
  }


}
export class dynamicSlider {
  source: any;
  filterOn: number;
  minVal: number;
  maxVal: number;
  defaultAnswer: number;
  minValLabel: string;
  maxValLabel: string;
  tag:any=[];
  constructor() {
    this.source = null;
    this.filterOn = 0;
    this.minVal = 0;
    this.maxVal = 0;
    this.defaultAnswer = 0;
    this.minValLabel = "";
    this.maxValLabel = "";
    this.tag = [];
  }





}

export class tableDropDown {
  source: any;
  colOneTitle: string;
  colTwoTitle: string;
  colThreeTitle: string;
  options:any= [];
  constructor() {
    this.source = null;
    this.colOneTitle = "";
    this.colTwoTitle = "";
    this.colThreeTitle = "";
    this.options = [];
  }
}
export class tableSkill {
  source: any;
  dataId: string;
  colOneTitle: string;
  colTwoTitle: string;
  colThreeTitle: string;
  colFourTitle: string;
  colFiveTitle: string;
  options:any= [];
  constructor() {
    this.source = null;
    this.dataId = "";
    this.colOneTitle = "";
    this.colTwoTitle = "";
    this.colThreeTitle = "";
    this.colFourTitle = "";
    this.colFiveTitle = "";
    this.options = [];
  }
}
export class tableSkillTrait {
  source: any;
  dataId: string;
  filterOn: string;
  constructor() {
    this.source = null;
    this.dataId = "";
    this.filterOn = "";
  }
}
export class tableTrait {
  source: any;
  dataId: string;
  columns:any= [];
  values:any= [];

  constructor() {
    this.source = null;
    this.dataId = "";
    this.columns = [];
    this.values = [];
  }
}
export class tableYesNo {
  source: any;
  firstColumnTitle  :string;
  secondColumnTitle : string;
  constructor(){
    this.source =null;
    this.firstColumnTitle = "";
    this.secondColumnTitle = "";
  }


}

// ----Template----------

export class professionTemplate{
  year : any;
  companyName : any;
  jobTitle : any;
  duration : any;
  constructor(){
    this.year ="";
    this.companyName = "";
    this.jobTitle = "";
    this.duration = "";
  }

}
// ------------------------Report-----------------
export class report {
  active: boolean;
  type: any;
  description: string;
  constructor() {
    this.active = false;
    this.type = null;
    this.description = '';
  }
}

export class CustomTemplate{

  name:any;
  active: boolean;
  constructor(){
    this.name = null;
    this.active = false;
  }
}
