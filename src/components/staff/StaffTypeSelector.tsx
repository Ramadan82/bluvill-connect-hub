
import { useState, useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { GraduationCap, Briefcase } from 'lucide-react';

interface StaffTypeSelectorProps {
  onTypeChange: (type: string) => void;
  currentType: string;
}

const StaffTypeSelector = ({ onTypeChange, currentType }: StaffTypeSelectorProps) => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const updateStaffType = async (type: string) => {
    if (type === currentType) return;
    
    setLoading(true);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;
      
      const { error } = await supabase
        .from('profiles')
        .update({ staff_type: type })
        .eq('id', session.user.id);
        
      if (error) throw error;
      
      onTypeChange(type);
      toast({
        title: "Staff Type Updated",
        description: `You are now viewing as ${type} staff.`,
      });
    } catch (error) {
      console.error("Error updating staff type:", error);
      toast({
        title: "Update Failed",
        description: "Could not update staff type. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex gap-2 mb-4">
      <Button
        variant={currentType === 'academic' ? 'default' : 'outline'}
        className="flex items-center gap-2"
        onClick={() => updateStaffType('academic')}
        disabled={loading}
      >
        <GraduationCap className="h-4 w-4" />
        Academic Staff
      </Button>
      <Button
        variant={currentType === 'non-academic' ? 'default' : 'outline'}
        className="flex items-center gap-2"
        onClick={() => updateStaffType('non-academic')}
        disabled={loading}
      >
        <Briefcase className="h-4 w-4" />
        Non-Academic Staff
      </Button>
    </div>
  );
};

export default StaffTypeSelector;
