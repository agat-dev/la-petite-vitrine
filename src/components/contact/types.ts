export type RequestType = 'information' | 'quote';

export interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company: string;
  subject: string;
  message: string;
  projectType: string;
  budget: string;
  timeline: string;
  description: string;
  urgentProject: boolean;
}

export interface MultiStepFormData {
  requestType: RequestType | '';
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company: string;
  subject: string;
  message: string;
  projectType: string;
  budget: string;
  timeline: string;
  description: string;
  urgentProject: boolean;
  additionalInfo: string;
  projectDetails: {
    artisanType: string;
    location: string;
    companyAddress: string;
    city: string;
    postalCode: string;
    servicesOffered: string;
    specialty: string;
    targetClients: string;
    contentTone: string;
    uploadedFiles: File[];
    sections: {
      about: boolean;
      services: boolean;
      portfolio: boolean;
      practicalInfo: boolean;
      contactForm: boolean;
    };
    additionalInfo: string;
  };
}

export interface OrderItem {
  id: number;
  product: string;
  quantity: number;
  specifications: string;
}

export interface ProjectDetails {
  artisanType: string;
  location: string;
  companyAddress: string;
  city: string;
  postalCode: string;
  servicesOffered: string;
  specialty: string;
  targetClients: string;
  contentTone: string;
  uploadedFiles: File[];
  sections: {
    about: boolean;
    services: boolean;
    portfolio: boolean;
    practicalInfo: boolean;
    contactForm: boolean;
  };
  additionalInfo: string;
}
