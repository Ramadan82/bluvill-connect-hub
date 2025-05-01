import { useFormContext } from "react-hook-form";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { graduatePrograms } from "../schemas";
import { Plus, Trash2 } from "lucide-react";

type EducationHistory = {
  university: string;
  program: string;
  graduationYear: string;
  degreeClass: string;
};

type WorkHistory = {
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  responsibilities: string;
};

export const GraduateAcademicInfoForm = ({
  onBack,
  onContinue
}: {
  onBack: () => void;
  onContinue: () => void;
}) => {
  const form = useFormContext<{
    educationHistory: EducationHistory[];
    workHistory: WorkHistory[];
    degreeType: string;
    researchInterest: string;
  }>();

  const educationHistory = form.watch("educationHistory") || [];
  const workHistory = form.watch("workHistory") || [];
  const degreeType = form.watch("degreeType");

  // Filter programs based on degree type
  const filteredPrograms = graduatePrograms.filter(program => {
    if (degreeType === "master") return program.includes("M.Sc.") || program.includes("MBA");
    if (degreeType === "phd") return program.includes("Ph.D.");
    return true;
  });

  const addEducation = () => {
    form.setValue("educationHistory", [
      ...educationHistory,
      {
        university: "",
        program: "",
        graduationYear: "",
        degreeClass: ""
      }
    ]);
  };

  const removeEducation = (index: number) => {
    const newEducation = [...educationHistory];
    newEducation.splice(index, 1);
    form.setValue("educationHistory", newEducation);
  };

  const addWork = () => {
    form.setValue("workHistory", [
      ...workHistory,
      {
        company: "",
        position: "",
        startDate: "",
        endDate: "",
        responsibilities: ""
      }
    ]);
  };

  const removeWork = (index: number) => {
    const newWork = [...workHistory];
    newWork.splice(index, 1);
    form.setValue("workHistory", newWork);
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold">Academic Information</h3>
      
      <FormField
        control={form.control}
        name="degreeType"
        render={({ field }) => (
          <FormItem className="space-y-3">
            <FormLabel>Degree Type</FormLabel>
            <FormControl>
              <RadioGroup
                onValueChange={field.onChange}
                defaultValue={field.value}
                className="flex space-x-4"
              >
                <FormItem className="flex items-center space-x-3 space-y-0">
                  <FormControl>
                    <RadioGroupItem value="master" />
                  </FormControl>
                  <FormLabel className="font-normal">
                    Master's
                  </FormLabel>
                </FormItem>
                <FormItem className="flex items-center space-x-3 space-y-0">
                  <FormControl>
                    <RadioGroupItem value="phd" />
                  </FormControl>
                  <FormLabel className="font-normal">
                    Ph.D.
                  </FormLabel>
                </FormItem>
              </RadioGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Program of Study Dropdown */}
      <FormField
        control={form.control}
        name="educationHistory.0.program" // First education entry's program
        render={({ field }) => (
          <FormItem>
            <FormLabel>Program of Study</FormLabel>
            <Select 
              onValueChange={field.onChange} 
              value={field.value}
              disabled={!degreeType}
            >
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder={degreeType ? "Select your program" : "Select degree type first"} />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {filteredPrograms.map((program) => (
                  <SelectItem key={program} value={program}>
                    {program}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Education History Section */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h4 className="font-medium">Education History</h4>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={addEducation}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Education
          </Button>
        </div>

        {educationHistory.map((_, index) => (
          <div key={index} className="border rounded-lg p-4 space-y-4">
            <div className="flex justify-between items-center">
              <h5 className="font-medium">Institution #{index + 1}</h5>
              {educationHistory.length > 1 && (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => removeEducation(index)}
                >
                  <Trash2 className="h-4 w-4 text-red-500" />
                </Button>
              )}
            </div>

            <FormField
              control={form.control}
              name={`educationHistory.${index}.university`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>University Attended</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter university name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name={`educationHistory.${index}.graduationYear`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Year of Graduation</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="YYYY" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`educationHistory.${index}.degreeClass`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Degree Class</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., First Class, 2:1" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Work History Section */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h4 className="font-medium">Work History</h4>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={addWork}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Work Experience
          </Button>
        </div>

        {workHistory.map((_, index) => (
          <div key={index} className="border rounded-lg p-4 space-y-4">
            <div className="flex justify-between items-center">
              <h5 className="font-medium">Experience #{index + 1}</h5>
              {workHistory.length > 1 && (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => removeWork(index)}
                >
                  <Trash2 className="h-4 w-4 text-red-500" />
                </Button>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name={`workHistory.${index}.company`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company</FormLabel>
                    <FormControl>
                      <Input placeholder="Company name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`workHistory.${index}.position`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Position</FormLabel>
                    <FormControl>
                      <Input placeholder="Your position" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name={`workHistory.${index}.startDate`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Start Date</FormLabel>
                    <FormControl>
                      <Input type="month" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`workHistory.${index}.endDate`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>End Date</FormLabel>
                    <FormControl>
                      <Input type="month" placeholder="Present if current" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name={`workHistory.${index}.responsibilities`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Responsibilities</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Describe your responsibilities and achievements" 
                      {...field} 
                      rows={3}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        ))}
      </div>

      {/* Research Interests */}
      <FormField
        control={form.control}
        name="researchInterest"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Research Interests</FormLabel>
            <FormControl>
              <Textarea 
                placeholder="Describe your research interests and goals for graduate study" 
                {...field} 
                rows={4}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="flex justify-between pt-4">
        <Button 
          type="button" 
          variant="outline" 
          onClick={onBack}
        >
          Back
        </Button>
        <Button 
          type="button"
          onClick={onContinue}
          className="bg-blue-700 hover:bg-blue-800"
        >
          Continue
        </Button>
      </div>
    </div>
  );
};