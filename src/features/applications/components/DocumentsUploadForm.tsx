import { useFormContext } from "react-hook-form";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus, Trash2 } from "lucide-react";

export const DocumentsUploadForm = () => {
  const form = useFormContext();
  const documents = form.watch("documents") || [];

  const addDocument = () => {
    form.setValue("documents", [
      ...documents,
      { type: "", file: null }
    ]);
  };

  const removeDocument = (index: number) => {
    const newDocs = [...documents];
    newDocs.splice(index, 1);
    form.setValue("documents", newDocs);
  };

  const handleFileChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      const newDocs = [...documents];
      newDocs[index].file = e.target.files[0];
      form.setValue("documents", newDocs);
    }
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold">Documents Upload</h3>
      
      <div className="space-y-4">
        {documents.map((_, index) => (
          <div key={index} className="border rounded-lg p-4 space-y-4">
            <div className="flex justify-between items-center">
              <h5 className="font-medium">Document #{index + 1}</h5>
              {documents.length > 1 && (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => removeDocument(index)}
                >
                  <Trash2 className="h-4 w-4 text-red-500" />
                </Button>
              )}
            </div>

            <FormField
              control={form.control}
              name={`documents.${index}.type`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Document Type</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Personal Statement, WAEC Result" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormItem>
              <FormLabel>Upload File</FormLabel>
              <FormControl>
                <Input 
                  type="file" 
                  onChange={(e) => handleFileChange(index, e)}
                />
              </FormControl>
              {documents[index]?.file?.name && (
                <p className="text-sm text-gray-500 mt-1">
                  Selected: {documents[index].file.name}
                </p>
              )}
              <FormMessage />
            </FormItem>
          </div>
        ))}

        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={addDocument}
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Document
        </Button>
      </div>
    </div>
  );
};