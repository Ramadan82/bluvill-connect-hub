import { useFormContext } from "react-hook-form";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export const ReferencesForm = () => {
  const form = useFormContext();
  
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold">References</h3>
      <p className="text-gray-600">Please provide 2 academic references</p>
      
      <div className="space-y-6">
        {[0, 1].map((index) => (
          <div key={index} className="border rounded-lg p-4 space-y-4">
            <h5 className="font-medium">Reference #{index + 1}</h5>
            
            <FormField
              control={form.control}
              name={`references.${index}.name`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Referee's full name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name={`references.${index}.email`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="Referee's email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name={`references.${index}.relationship`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Relationship</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="e.g., Thesis Advisor, Professor" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        ))}
      </div>
    </div>
  );
};