import  { useEffect} from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import SubHeader from './components/SubHeader';
import Home from './pages/Home';
import UserProfile from './components/UserProfile';
import ModuleDetails from './components/ModuleDetails';
import SubModuleDetails from './components/SubModuleDetails';
import Blogs from './components/Blogs';
import Footer from './components/Footer';
import SignInSignUp from './components/SignInSignUp';
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './components/ResetPassword';
import PageTransition from "./components/PageTransition"; 
import Course from './components/Course';
import CourseDetailed from './components/CourseDetailed';
import CourseDetailes from './components/CourseDetailes';
import CareerOption from './pages/CareerOption';
import CareerPage from './components/CareerPage';
import CareerBlog from './components/CareerBlog';
import About from './components/About';
import Faq from './components/Faq';
import CourseList from './components/CourseList';
import  Founder from './components/Founder';

import { useLocation } from 'react-router-dom';
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

function App() {
  



 
  return (
    <Router>
      <div className='relative z-0 bg-primary'>
        <div className='bg-hero-pattern bg-cover bg-no-repeat bg-center'>
          <Header />
          <SubHeader />
          <ScrollToTop />

          <Routes>     
             <Route path="/" element={<HomeWithBlogSuggestion />} />

                        <Route path="/sanjay-patidar-founder-eduxcel" element={<Founder/>} />

            <Route path="/courses" element={<Course />} />
            <Route path="/course/:category" element={<Course />} />
            <Route path="/courses/category/${category}" element={<CourseList />} />
            <Route path="/api/courses/details/:id" element={<CourseDetailed />} />


            <Route path="/profile" element={<UserProfile />} />
            <Route path="/about-us" element={<About />} />

            <Route path="/courses/:title" element={<CourseDetailes />} />
            <Route path="/courses/:title/:module" element={<ModuleDetails />} />
            <Route
              path="/courses/:title/:module/submodules/:submodule"
              element={<SubModuleDetails />}
            />
            <Route path="/signup" element={<PageTransition><SignInSignUp /></PageTransition>} />
        <Route path="/signin" element={<PageTransition><SignInSignUp /></PageTransition>} />
            <Route path="/forgot-password" element={<PageTransition><ForgotPassword /></PageTransition>} />
            <Route path="/reset" element={<PageTransition><ResetPassword /></PageTransition>} />

            <Route path="/blogs/*" element={<Blogs />} />
            <Route path="/careers/*" element={<CareerOption />} />
            <Route path="/:category/*" element={<CourseDetailes/>} />
            <Route path="/careers/:vision" element={<CareerPage />} />
            <Route path="/career/:vision/*" element={<CareerBlog/>} />

          </Routes>
        </div>
        <div className='relative z-0'>
       <Footer />
        </div>
      </div>
    </Router>

    
  );
}
const HomeWithBlogSuggestion = () => {
  return (
    <>
      <Home />
            <Faq/>

   
    </>
  );
};


export default App;
