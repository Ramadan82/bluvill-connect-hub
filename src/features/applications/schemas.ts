import { z } from "zod";
export const documentSchema = z.object({
  type: z.string().min(1, "Document type is required"),
  file: z.any().refine((file) => file instanceof File, "File is required"),
});

export const refereeSchema = z.object({
  name: z.string().min(2, "Referee name is required"),
  email: z.string().email("Valid email is required"),
  relationship: z.string().min(2, "Relationship is required"),
});

export const undergraduateFormSchema = z.object({
  firstName: z.string().min(2, { message: "First name must be at least 2 characters." }),
  lastName: z.string().min(2, { message: "Last name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phone: z.string().min(10, { message: "Phone number must be at least 10 digits." }),
  dob: z.date({ required_error: "A date of birth is required." }),
  gender: z.enum(["male", "female", "other"], { required_error: "You need to select a gender." }),
  program: z.string({ required_error: "Please select a program." }),
  jambRegNo: z.string().min(10, { message: "JAMB registration number must be at least 10 characters." }),
  jambScore: z.string().min(2, { message: "Please enter your JAMB score." }),
  address: z.string().min(10, { message: "Address must be at least 10 characters." }),
  stateOfOrigin: z.string().min(2, { message: "Please enter your state of origin." }),
  lga: z.string().min(2, { message: "Please enter your LGA." }),
  secondarySchool: z.string().min(5, { message: "Please enter your secondary school name." }),
  graduationYear: z.string().min(4, { message: "Please enter your graduation year." }),
  oLevelResults: z.string().min(5, { message: "Please describe your O'Level results." }),
  sponsorName: z.string().min(2, { message: "Sponsor name must be at least 2 characters." }),
  sponsorPhone: z.string().min(10, { message: "Sponsor phone must be at least 10 digits." }),
});

export const graduateFormSchema = z.object({
  firstName: z.string().min(2, { message: "First name must be at least 2 characters." }),
  lastName: z.string().min(2, { message: "Last name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phone: z.string().min(10, { message: "Phone number must be at least 10 digits." }),
  dob: z.date({ required_error: "A date of birth is required." }),
  gender: z.enum(["male", "female", "other"], { required_error: "You need to select a gender." }),
  program: z.string({ required_error: "Please select a program." }),
  degreeType: z.enum(["master", "phd"], { required_error: "Please select degree type." }),
  address: z.string().min(10, { message: "Address must be at least 10 characters." }),
  stateOfOrigin: z.string().min(2, { message: "Please enter your state of origin." }),
  lga: z.string().min(2, { message: "Please enter your LGA." }),
  universityAttended: z.string().min(5, { message: "Please enter your university name." }),
  graduationYear: z.string().min(4, { message: "Please enter your graduation year." }),
  degreeClass: z.string().min(2, { message: "Please enter your degree class." }),
  researchInterest: z.string().min(10, { message: "Please describe your research interests." }),
  workExperience: z.string().min(10, { message: "Please describe your work experience." }),
   educationHistory: z.array(
    z.object({
      university: z.string().min(5, "University name is required"),
      program: z.string().min(1, "Program is required"),
      graduationYear: z.string().min(4, "Valid year required"),
      degreeClass: z.string().min(2, "Degree class is required")
    })
  ).nonempty("At least one education entry is required"),
  workHistory: z.array(
    z.object({
      company: z.string().min(2, "Company name is required"),
      position: z.string().min(2, "Position is required"),
      startDate: z.string().min(1, "Start date is required"),
      endDate: z.string().optional(),
      responsibilities: z.string().min(10, "Please describe your responsibilities")
    })
  ),
  documents: z.array(documentSchema).min(1, "At least one document is required"),
  references: z.array(refereeSchema).length(2, "Exactly 2 references are required"),

});

export type UndergraduateFormValues = z.infer<typeof undergraduateFormSchema> & {
  documents: {
    type: string;
    file: File;
  }[];
};
export type GraduateFormValues = z.infer<typeof graduateFormSchema>;

export const undergraduatePrograms = [
  "Accounting", "Business Administration", "Computer Science", 
  "Economics", "Electrical Engineering", "Law",
  "Mass Communication", "Medicine and Surgery", "Microbiology", 
  "Political Science"
];

export const graduatePrograms = [
  "MBA (Master of Business Administration)",
  "M.Sc. Computer Science",
  "M.Sc. Economics",
  "M.Sc. Microbiology",
  "Ph.D. Computer Science",
  "Ph.D. Economics",
  "Ph.D. Political Science"
];