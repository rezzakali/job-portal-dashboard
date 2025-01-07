export interface ApplicantInterface{
  email:string;
  phone:string;
  resume:string;
  status:string;
}

export interface ApplicationInterface {
 _id:string;
 jobTitle:string;
 company:string;
 status:'open'|'closed';
 applicants:ApplicantInterface[];
 applicantsCount:number
}
