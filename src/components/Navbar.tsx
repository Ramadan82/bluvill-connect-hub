
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Menu, X, ChevronDown } from 'lucide-react';
import bulogo from "../../public/assets/images/bulogo.png"

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto py-4 px-4 md:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 flex items-center justify-center">
              <img src={bulogo} className="h-10 w-auto object-contain"/>
            </div>
            <span className="text-blue-800 font-bold text-xl hidden sm:inline-block">Bluvill University</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="font-medium flex items-center gap-1">
                  Programs <ChevronDown size={16} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuItem asChild>
                  <Link to="/programs/medical-sciences">Medical Sciences</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/programs/law">Law</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/programs/information-technology">Information Technology</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/programs/management">Management</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/programs">All Programs</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            <Link to="/admissions" className="font-medium text-gray-700 hover:text-blue-700">
              Admissions
            </Link>
            
            <Link to="/campus-life" className="font-medium text-gray-700 hover:text-blue-700">
              Campus Life
            </Link>
            
            <Link to="/about" className="font-medium text-gray-700 hover:text-blue-700">
              About Us
            </Link>
          </nav>

          {/* Portal Buttons */}
          <div className="hidden md:flex items-center space-x-3">
            <Link to="/student-portal">
              <Button variant="outline" className="text-blue-600 border-blue-600 hover:bg-blue-50">
                Student Portal
              </Button>
            </Link>
            <Link to="/staff-portal">
              <Button className="bg-blue-700 hover:bg-blue-800 text-white">
                Staff Portal
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden" 
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden py-4 mt-2 border-t">
            <nav className="flex flex-col space-y-4">
              <p className="font-semibold text-blue-800 px-2">Programs</p>
              <Link 
                to="/programs/medical-sciences" 
                className="px-2 py-1 text-gray-700 hover:text-blue-700"
                onClick={toggleMenu}
              >
                — Medical Sciences
              </Link>
              <Link 
                to="/programs/law" 
                className="px-2 py-1 text-gray-700 hover:text-blue-700"
                onClick={toggleMenu}
              >
                — Law
              </Link>
              <Link 
                to="/programs/information-technology" 
                className="px-2 py-1 text-gray-700 hover:text-blue-700"
                onClick={toggleMenu}
              >
                — Information Technology
              </Link>
              <Link 
                to="/programs/management" 
                className="px-2 py-1 text-gray-700 hover:text-blue-700"
                onClick={toggleMenu}
              >
                — Management
              </Link>
              <Link 
                to="/programs" 
                className="px-2 py-1 text-gray-700 hover:text-blue-700"
                onClick={toggleMenu}
              >
                — All Programs
              </Link>
              
              <Link 
                to="/admissions" 
                className="px-2 py-1 text-gray-700 hover:text-blue-700"
                onClick={toggleMenu}
              >
                Admissions
              </Link>
              
              <Link 
                to="/campus-life" 
                className="px-2 py-1 text-gray-700 hover:text-blue-700"
                onClick={toggleMenu}
              >
                Campus Life
              </Link>
              
              <Link 
                to="/about" 
                className="px-2 py-1 text-gray-700 hover:text-blue-700"
                onClick={toggleMenu}
              >
                About Us
              </Link>

              <div className="flex flex-col space-y-3 pt-2">
                <Link to="/student-portal" onClick={toggleMenu}>
                  <Button variant="outline" className="w-full text-blue-600 border-blue-600">
                    Student Portal
                  </Button>
                </Link>
                <Link to="/staff-portal" onClick={toggleMenu}>
                  <Button className="w-full bg-blue-700 hover:bg-blue-800 text-white">
                    Staff Portal
                  </Button>
                </Link>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
