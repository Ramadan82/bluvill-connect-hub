import { useFormContext } from "react-hook-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { GraduateFormValues } from "../schemas";

type GraduateReviewFormProps = {
  onBack: () => void;
  onSubmit: (data: GraduateFormValues) => void;
  isSubmitting: boolean;
  applicationType: 'undergraduate' | 'graduate';
};
export const GraduateReviewForm = ({
  onBack,
  onSubmit,
  isSubmitting,
  applicationType 
}: GraduateReviewFormProps) => {
  const form = useFormContext<GraduateFormValues>();

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold">Review Your Application</h3>
      <p className="text-gray-600">
        Please review all the information you've provided before submitting your application.
      </p>
      
      <Card>
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="font-medium text-gray-500">Full Name</p>
            <p>{`${form.watch('firstName')} ${form.watch('lastName')}`}</p>
          </div>
          <div>
            <p className="font-medium text-gray-500">Email</p>
            <p>{form.watch('email')}</p>
          </div>
          <div>
            <p className="font-medium text-gray-500">Phone</p>
            <p>{form.watch('phone')}</p>
          </div>
          <div>
            <p className="font-medium text-gray-500">Date of Birth</p>
            <p>{form.watch('dob') ? format(form.watch('dob'), "PPP") : 'Not provided'}</p>
          </div>
          <div>
            <p className="font-medium text-gray-500">Gender</p>
            <p>{form.watch('gender')}</p>
          </div>
          <div>
            <p className="font-medium text-gray-500">Address</p>
            <p>{form.watch('address')}</p>
          </div>
          <div>
            <p className="font-medium text-gray-500">State of Origin</p>
            <p>{form.watch('stateOfOrigin')}</p>
          </div>
          <div>
            <p className="font-medium text-gray-500">LGA</p>
            <p>{form.watch('lga')}</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Academic Information</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="font-medium text-gray-500">Program</p>
            <p>{form.watch('program') || 'Not selected'}</p>
          </div>
          <div>
            <p className="font-medium text-gray-500">Degree Type</p>
            <p>{form.watch('degreeType') === 'master' ? "Master's" : "Ph.D."}</p>
          </div>
          <div>
            <p className="font-medium text-gray-500">University Attended</p>
            <p>{form.watch('universityAttended')}</p>
          </div>
          <div>
            <p className="font-medium text-gray-500">Graduation Year</p>
            <p>{form.watch('graduationYear')}</p>
          </div>
          <div>
            <p className="font-medium text-gray-500">Degree Class</p>
            <p>{form.watch('degreeClass')}</p>
          </div>
          <div className="md:col-span-2">
            <p className="font-medium text-gray-500">Research Interests</p>
            <p className="whitespace-pre-line">{form.watch('researchInterest')}</p>
          </div>
          <div className="md:col-span-2">
            <p className="font-medium text-gray-500">Work Experience</p>
            <p className="whitespace-pre-line">{form.watch('workExperience')}</p>
          </div>
        </CardContent>
      </Card>
      <Card>
  <CardHeader>
    <CardTitle>Documents</CardTitle>
  </CardHeader>
  <CardContent className="space-y-4">
    {form.watch("documents")?.map((doc, index) => (
      <div key={index} className="border-b pb-2">
        <p className="font-medium text-gray-500">Document {index + 1}</p>
        <p>Type: {doc.type}</p>
        <p>File: {doc.file?.name || "No file uploaded"}</p>
      </div>
    ))}
  </CardContent>
</Card>
      {applicationType === 'graduate' && (
  <Card>
    <CardHeader>
      <CardTitle>References</CardTitle>
    </CardHeader>
    <CardContent className="space-y-4">
      {form.watch("references")?.map((ref, index) => (
        <div key={index} className="border-b pb-2">
          <p className="font-medium text-gray-500">Reference {index + 1}</p>
          <p>Name: {ref.name}</p>
          <p>Email: {ref.email}</p>
          <p>Relationship: {ref.relationship}</p>
        </div>
      ))}
    </CardContent>
  </Card>
)}

      <div className="flex items-start space-x-2">
        <input type="checkbox" id="agreeTerms" required className="mt-1" />
        <label htmlFor="agreeTerms" className="text-sm text-gray-600">
          I certify that all information provided in this application is accurate and complete. 
          I understand that providing false information may result in the rejection of my 
          application or revocation of admission.
        </label>
      </div>

      <div className="flex justify-between pt-4">
        <Button 
          type="button" 
          variant="outline" 
          onClick={onBack}
        >
          Back
        </Button>
        <Button 
          type="submit"
          onClick={() => onSubmit(form.getValues())}
          className="bg-blue-700 hover:bg-blue-800"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Submitting...' : 'Submit Application'}
        </Button>
      </div>
    </div>
  );
};