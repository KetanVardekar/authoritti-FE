export class AddEditApp {

  active: boolean;
  name: string;
  type: any;
  icon: any;
  title: string;
  page: any;
  group: any;
  categories: any;

  constructor(){
    this.active = false;
    this.name = '';
    this.type = null;
    this.icon = null;
    this.title = '';
    this.page = [];
    this.group = [];
    this.categories = [];
  }
}
