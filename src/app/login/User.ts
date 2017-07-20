export interface User {
  _id: string;
  userName : string;
  firstName : string;
  lastName : string;
  email : string;
  password : string;
  gender : string;
  phone : string;
  contact : {
    address1? : string;
    address2? : string;
    city? : string;
    state? : string;
    zip? : string;
    country? : string;
  }
}
