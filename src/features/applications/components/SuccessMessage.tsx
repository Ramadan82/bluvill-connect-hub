import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

export const SuccessMessage = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-3xl mx-auto text-center">
      <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-8">
        <strong className="font-bold">Success! </strong>
        <span className="block sm:inline">
          Your application has been submitted successfully. You will receive a confirmation email shortly.
        </span>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Next Steps</CardTitle>
        </CardHeader>
        <CardContent className="text-left space-y-4">
          <p className="text-gray-700">
            <strong>1. Application Review:</strong> Our admissions team will review your application within 7-10 working days.
          </p>
          <p className="text-gray-700">
            <strong>2. Admission Decision:</strong> You will receive an email notification once a decision has been made.
          </p>
          <p className="text-gray-700">
            <strong>3. Payment of Fees:</strong> If accepted, you'll receive instructions for paying your acceptance fee.
          </p>
          <p className="text-gray-700">
            <strong>4. Registration:</strong> Complete your registration process before the semester begins.
          </p>
          <div className="pt-4">
            <Button 
              onClick={() => navigate('/')} 
              className="bg-blue-700 hover:bg-blue-800 mr-4"
            >
              Return to Home
            </Button>
            <Button 
              onClick={() => navigate('/admissions')} 
              variant="outline"
            >
              View Admission Status
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};