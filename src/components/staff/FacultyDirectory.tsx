
import { useState } from 'react';
import { Users, Search, MapPin, Phone, Mail, GraduationCap, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';

const FacultyDirectory = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [department, setDepartment] = useState('all');
  const [staffType, setStaffType] = useState('all');
  
  // Mock faculty data
  const facultyMembers = [
    {
      id: 1,
      name: "Dr. Jonathan Smith",
      title: "Professor",
      department: "Computer Science",
      email: "j.smith@bluvilluniversity.edu.ng",
      phone: "+234 803-555-1234",
      office: "Science Building, Room 305",
      staffType: "academic",
      avatar: "https://placehold.co/60"
    },
    {
      id: 2,
      name: "Dr. Emily Chen",
      title: "Associate Professor",
      department: "Mathematics",
      email: "e.chen@bluvilluniversity.edu.ng",
      phone: "+234 803-555-2345",
      office: "Science Building, Room 212",
      staffType: "academic",
      avatar: "https://placehold.co/60"
    },
    {
      id: 3,
      name: "Prof. Michael Johnson",
      title: "Department Chair",
      department: "Business Administration",
      email: "m.johnson@bluvilluniversity.edu.ng",
      phone: "+234 803-555-3456",
      office: "Business Building, Room 401",
      staffType: "academic",
      avatar: "https://placehold.co/60"
    },
    {
      id: 4,
      name: "Sarah Williams",
      title: "Administrative Assistant",
      department: "Computer Science",
      email: "s.williams@bluvilluniversity.edu.ng",
      phone: "+234 803-555-4567",
      office: "Science Building, Room 300",
      staffType: "non-academic",
      avatar: "https://placehold.co/60"
    },
    {
      id: 5,
      name: "Robert Davis",
      title: "IT Support Specialist",
      department: "Information Technology",
      email: "r.davis@bluvilluniversity.edu.ng",
      phone: "+234 803-555-5678",
      office: "Admin Building, Room 105",
      staffType: "non-academic",
      avatar: "https://placehold.co/60"
    }
  ];
  
  // Department options
  const departments = [
    { value: "all", label: "All Departments" },
    { value: "Computer Science", label: "Computer Science" },
    { value: "Mathematics", label: "Mathematics" },
    { value: "Business Administration", label: "Business Administration" },
    { value: "Information Technology", label: "Information Technology" }
  ];
  
  // Filter faculty members based on search term, department, and staff type
  const filteredFaculty = facultyMembers.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          member.department.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = department === 'all' || member.department === department;
    const matchesStaffType = staffType === 'all' || member.staffType === staffType;
    
    return matchesSearch && matchesDepartment && matchesStaffType;
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Faculty & Staff Directory</h1>
        <Button>
          <Users className="h-4 w-4 mr-2" />
          Add New Staff
        </Button>
      </div>
      
      {/* Search and Filter Controls */}
      <Card>
        <CardHeader>
          <CardTitle>Search Directory</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 h-4 w-4" />
              <Input 
                placeholder="Search by name or department" 
                className="pl-9"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={department} onValueChange={setDepartment}>
              <SelectTrigger>
                <SelectValue placeholder="Department" />
              </SelectTrigger>
              <SelectContent>
                {departments.map(dept => (
                  <SelectItem key={dept.value} value={dept.value}>{dept.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={staffType} onValueChange={setStaffType}>
              <SelectTrigger>
                <SelectValue placeholder="Staff Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Staff</SelectItem>
                <SelectItem value="academic">Academic Staff</SelectItem>
                <SelectItem value="non-academic">Non-Academic Staff</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>
      
      {/* Directory Results */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredFaculty.length > 0 ? (
          filteredFaculty.map(member => (
            <Card key={member.id} className="overflow-hidden">
              <CardContent className="p-0">
                <div className={`h-2 ${member.staffType === 'academic' ? 'bg-bluvill-600' : 'bg-emerald-600'}`}></div>
                <div className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <Avatar className="h-16 w-16">
                      <AvatarImage src={member.avatar} alt={member.name} />
                      <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold text-lg">{member.name}</h3>
                      <p className="text-gray-500">
                        {member.title} • {member.department}
                      </p>
                      <div className="mt-1 inline-flex items-center gap-1 text-xs px-2 py-0.5 bg-gray-100 rounded-full">
                        {member.staffType === 'academic' ? (
                          <>
                            <GraduationCap className="h-3 w-3" />
                            <span>Academic</span>
                          </>
                        ) : (
                          <>
                            <Clock className="h-3 w-3" />
                            <span>Administrative</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-start gap-2">
                      <Mail className="h-4 w-4 text-gray-500 mt-0.5" />
                      <span className="text-gray-600">{member.email}</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Phone className="h-4 w-4 text-gray-500 mt-0.5" />
                      <span className="text-gray-600">{member.phone}</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <MapPin className="h-4 w-4 text-gray-500 mt-0.5" />
                      <span className="text-gray-600">{member.office}</span>
                    </div>
                  </div>
                  <div className="mt-4 flex gap-2">
                    <Button size="sm" variant="outline" className="flex-1">Contact</Button>
                    <Button size="sm" className="flex-1">View Profile</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="col-span-full text-center py-10">
            <div className="flex flex-col items-center">
              <Users className="h-12 w-12 text-gray-300 mb-2" />
              <h3 className="text-lg font-medium mb-1">No staff members found</h3>
              <p className="text-gray-500">Try adjusting your search or filters</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FacultyDirectory;
