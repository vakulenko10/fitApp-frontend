import { BrowserRouter } from "react-router-dom";
import { AuthWrapper } from "@/components/auth/AuthWrapper";
import Header from  "@/components/navigation/Header";
import { RenderRoutes } from "@/components/navigation/RenderRoutes";
import { Toaster } from "@/components/ui/sonner";
import Footer from "./components/navigation/Footer";


function App() {
  return (
    <BrowserRouter>
      <AuthWrapper>
        <Header />
        <RenderRoutes/>
        <Toaster />
        <Footer />
      </AuthWrapper>
    </BrowserRouter>
  );
}

export default App;
