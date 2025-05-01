import { useFormContext } from "react-hook-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { UndergraduateFormValues } from "../schemas";

type DocumentEntry = {
  type: string;
  file: File;
};

type UndergraduateReviewFormProps = {
  onBack: () => void;
  onSubmit: (data: UndergraduateFormValues) => void;
  isSubmitting: boolean;
};

export const UndergraduateReviewForm = ({
  onBack,
  onSubmit,
  isSubmitting
}: UndergraduateReviewFormProps) => {
  const form = useFormContext<UndergraduateFormValues>();
  const documents = form.watch("documents") || [];

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold">Review Your Application</h3>
      <p className="text-gray-600">
        Please review all the information you've provided before submitting your application.
      </p>
      
      {/* Personal Information */}
      <Card>
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="font-medium text-gray-500">Full Name</p>
            <p>{`${form.watch('firstName') || 'Not provided'} ${form.watch('lastName') || ''}`}</p>
          </div>
          <div>
            <p className="font-medium text-gray-500">Email</p>
            <p>{form.watch('email') || 'Not provided'}</p>
          </div>
          <div>
            <p className="font-medium text-gray-500">Phone</p>
            <p>{form.watch('phone') || 'Not provided'}</p>
          </div>
          <div>
            <p className="font-medium text-gray-500">Date of Birth</p>
            <p>{form.watch('dob') ? format(form.watch('dob'), "PPP") : 'Not provided'}</p>
          </div>
          <div>
            <p className="font-medium text-gray-500">Gender</p>
            <p>{form.watch('gender') || 'Not specified'}</p>
          </div>
          <div>
            <p className="font-medium text-gray-500">Address</p>
            <p>{form.watch('address') || 'Not provided'}</p>
          </div>
          <div>
            <p className="font-medium text-gray-500">State of Origin</p>
            <p>{form.watch('stateOfOrigin') || 'Not provided'}</p>
          </div>
          <div>
            <p className="font-medium text-gray-500">LGA</p>
            <p>{form.watch('lga') || 'Not provided'}</p>
          </div>
        </CardContent>
      </Card>

      {/* Academic Information */}
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
            <p className="font-medium text-gray-500">JAMB Reg No</p>
            <p>{form.watch('jambRegNo') || 'Not provided'}</p>
          </div>
          <div>
            <p className="font-medium text-gray-500">JAMB Score</p>
            <p>{form.watch('jambScore') || 'Not provided'}</p>
          </div>
          <div>
            <p className="font-medium text-gray-500">Secondary School</p>
            <p>{form.watch('secondarySchool') || 'Not provided'}</p>
          </div>
          <div>
            <p className="font-medium text-gray-500">Graduation Year</p>
            <p>{form.watch('graduationYear') || 'Not provided'}</p>
          </div>
          <div>
            <p className="font-medium text-gray-500">O'Level Results</p>
            <p className="whitespace-pre-line">{form.watch('oLevelResults') || 'Not provided'}</p>
          </div>
          <div>
            <p className="font-medium text-gray-500">Sponsor's Name</p>
            <p>{form.watch('sponsorName') || 'Not provided'}</p>
          </div>
          <div>
            <p className="font-medium text-gray-500">Sponsor's Phone</p>
            <p>{form.watch('sponsorPhone') || 'Not provided'}</p>
          </div>
        </CardContent>
      </Card>

      {/* Documents Section */}
      <Card>
        <CardHeader>
          <CardTitle>Uploaded Documents</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {documents.length > 0 ? (
            documents.map((doc: DocumentEntry, index: number) => (
              <div key={index} className="border-b pb-2">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium text-gray-500">Document {index + 1}</p>
                    <p>Type: {doc.type || 'Not specified'}</p>
                    <p className="text-sm text-gray-600">
                      File: {doc.file?.name || 'No file uploaded'}
                    </p>
                  </div>
                  {doc.file && (
                    <Button
                      variant="link"
                      size="sm"
                      onClick={() => window.open(URL.createObjectURL(doc.file))}
                    >
                      View
                    </Button>
                  )}
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No documents uploaded</p>
          )}
        </CardContent>
      </Card>

      {/* Terms Agreement */}
      <div className="flex items-start space-x-2">
        <input 
          type="checkbox" 
          id="agreeTerms" 
          required 
          className="mt-1 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
        />
        <label htmlFor="agreeTerms" className="text-sm text-gray-600">
          I certify that all information provided in this application is accurate and complete. 
          I understand that providing false information may result in the rejection of my 
          application or revocation of admission.
        </label>
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between pt-4">
        <Button 
          type="button" 
          variant="outline" 
          onClick={onBack}
          className="min-w-[100px]"
        >
          Back
        </Button>
        <Button 
          type="button"
          onClick={() => onSubmit(form.getValues())}
          className="bg-blue-700 hover:bg-blue-800 min-w-[150px]"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <span className="flex items-center">
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Submitting...
            </span>
          ) : 'Submit Application'}
        </Button>
      </div>
    </div>
  );
};