
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-bluvill-950 text-white py-12">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <h3 className="text-xl font-bold mb-4">Bluvill University</h3>
            <p className="text-gray-300 mb-4">
              Empowering minds and transforming lives through excellence in education and research.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-white"><Facebook size={20} /></a>
              <a href="#" className="text-gray-300 hover:text-white"><Twitter size={20} /></a>
              <a href="#" className="text-gray-300 hover:text-white"><Instagram size={20} /></a>
              <a href="#" className="text-gray-300 hover:text-white"><Linkedin size={20} /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/programs" className="text-gray-300 hover:text-white">Programs</Link></li>
              <li><Link to="/admissions" className="text-gray-300 hover:text-white">Admissions</Link></li>
              <li><Link to="/campus-life" className="text-gray-300 hover:text-white">Campus Life</Link></li>
              <li><Link to="/about" className="text-gray-300 hover:text-white">About Us</Link></li>
              <li><Link to="/student-portal" className="text-gray-300 hover:text-white">Student Portal</Link></li>
              <li><Link to="/staff-portal" className="text-gray-300 hover:text-white">Staff Portal</Link></li>
            </ul>
          </div>

          {/* Programs */}
          <div>
            <h3 className="text-xl font-bold mb-4">Programs</h3>
            <ul className="space-y-2">
              <li><Link to="/programs/medical-sciences" className="text-gray-300 hover:text-white">Medical Sciences</Link></li>
              <li><Link to="/programs/law" className="text-gray-300 hover:text-white">Law</Link></li>
              <li><Link to="/programs/information-technology" className="text-gray-300 hover:text-white">Information Technology</Link></li>
              <li><Link to="/programs/management" className="text-gray-300 hover:text-white">Management</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xl font-bold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin size={20} className="mr-2 mt-1 flex-shrink-0" />
                <span className="text-gray-300">Bluvill Campus, Abuja, Nigeria</span>
              </li>
              <li className="flex items-center">
                <Phone size={20} className="mr-2 flex-shrink-0" />
                <span className="text-gray-300">+234 800 123 4567</span>
              </li>
              <li className="flex items-center">
                <Mail size={20} className="mr-2 flex-shrink-0" />
                <span className="text-gray-300">info@bluvilluniversity.edu.ng</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-bluvill-800">
          <p className="text-center text-gray-400">
            © {new Date().getFullYear()} Bluvill University. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
