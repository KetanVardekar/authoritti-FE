export class addEditUser {

  name: string;
  email: string;
  password: any;
  permissions: any;
  admin: any;
  numberOfReports : any;

  constructor() {
    this.name = '';
    this.email = '';
    this.password = '';
    this.numberOfReports = '';
    this.permissions = [];
    this.admin = false;
  }
}
