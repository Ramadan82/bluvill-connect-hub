import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

type ApplicationTypeStepProps = {
  applicationType: 'undergraduate' | 'graduate';
  setApplicationType: (type: 'undergraduate' | 'graduate') => void;
  onContinue: () => void;
};

export const ApplicationTypeStep = ({
  applicationType,
  setApplicationType,
  onContinue
}: ApplicationTypeStepProps) => {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold">Select Application Type</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div 
          className={`border rounded-lg p-6 cursor-pointer transition-all ${applicationType === 'undergraduate' ? 'border-blue-600 bg-blue-50' : 'border-gray-300 hover:border-blue-400'}`}
          onClick={() => setApplicationType('undergraduate')}
        >
          <h4 className="font-semibold text-lg mb-2">Undergraduate Programs</h4>
          <p className="text-gray-600">
            For students seeking bachelor's degrees (B.Sc., B.A., etc.)
          </p>
        </div>
        <div 
          className={`border rounded-lg p-6 cursor-pointer transition-all ${applicationType === 'graduate' ? 'border-blue-600 bg-blue-50' : 'border-gray-300 hover:border-blue-400'}`}
          onClick={() => setApplicationType('graduate')}
        >
          <h4 className="font-semibold text-lg mb-2">Graduate Programs</h4>
          <p className="text-gray-600">
            For students seeking master's or doctoral degrees (M.Sc., MBA, Ph.D.)
          </p>
        </div>
      </div>
      <div className="flex justify-end pt-4">
        <Button 
          onClick={onContinue}
          className="bg-blue-700 hover:bg-blue-800"
        >
          Continue
        </Button>
      </div>
    </div>
  );
};