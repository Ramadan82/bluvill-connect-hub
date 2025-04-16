
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Programs from "./pages/Programs";
import ProgramDetail from "./pages/ProgramDetail";
import Admissions from "./pages/Admissions";
import CampusLife from "./pages/CampusLife";
import CampusTour from "./pages/CampusTour";
import AboutUs from "./pages/AboutUs";
import StudentPortal from "./pages/StudentPortal";
import StaffPortal from "./pages/StaffPortal";
import Layout from "./components/Layout";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout><Index /></Layout>} />
          <Route path="/programs" element={<Layout><Programs /></Layout>} />
          <Route path="/programs/:id" element={<Layout><ProgramDetail /></Layout>} />
          <Route path="/admissions" element={<Layout><Admissions /></Layout>} />
          <Route path="/campus-life" element={<Layout><CampusLife /></Layout>} />
          <Route path="/campus-tour" element={<Layout><CampusTour /></Layout>} />
          <Route path="/about" element={<Layout><AboutUs /></Layout>} />
          <Route path="/student-portal" element={<Layout><StudentPortal /></Layout>} />
          <Route path="/staff-portal" element={<Layout><StaffPortal /></Layout>} />
          <Route path="*" element={<Layout><NotFound /></Layout>} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
