import { useFormContext } from "react-hook-form";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { undergraduatePrograms } from "../schemas";

export const UndergraduateAcademicInfoForm = ({
  onBack,
  onContinue
}: {
  onBack: () => void;
  onContinue: () => void;
}) => {
  const form = useFormContext();

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold">Academic Information</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          control={form.control}
          name="program"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Program of Study</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your program" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {undergraduatePrograms.map((program) => (
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
        <FormField
          control={form.control}
          name="jambRegNo"
          render={({ field }) => (
            <FormItem>
              <FormLabel>JAMB Registration Number</FormLabel>
              <FormControl>
                <Input placeholder="Enter your JAMB registration number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="jambScore"
          render={({ field }) => (
            <FormItem>
              <FormLabel>JAMB Score</FormLabel>
              <FormControl>
                <Input type="number" placeholder="Enter your JAMB score" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="secondarySchool"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Secondary School Attended</FormLabel>
              <FormControl>
                <Input placeholder="Enter your secondary school name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="graduationYear"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Year of Graduation</FormLabel>
              <FormControl>
                <Input type="number" placeholder="Enter your graduation year" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="oLevelResults"
          render={({ field }) => (
            <FormItem>
              <FormLabel>O'Level Results</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="List your O'Level results (e.g., English - A1, Mathematics - B2, etc.)" 
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="sponsorName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Sponsor's Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter your sponsor's name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="sponsorPhone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Sponsor's Phone Number</FormLabel>
              <FormControl>
                <Input placeholder="Enter your sponsor's phone number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
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
          type="button"
          className="bg-blue-700 hover:bg-blue-800"
          onClick={onContinue}
        >
          Continue
        </Button>
      </div>
    </div>
  );
};