export interface JobsInterface {
  _id: string;
  title: string;
  description: string;
  skills: string[];
  employementType: string;
  experienceLevel: string;
  location: string;
  salary: number;
  status: string;
  company: string;
  createdAt: string;
  createdBy?: {
    email: string;
  };
}
