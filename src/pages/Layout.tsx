import { Outlet } from "react-router";
import { Footer } from "../components/footer";
import Navbar from "../components/Navbar";




const Layout = () => {
  return (
    <div>
      <Navbar/>
      <Outlet />
      <Footer />
      
    
    </div>
  );
};

export default Layout;
