import { BrowserRouter } from "react-router-dom";
import { AuthWrapper } from "@/components/auth/AuthWrapper";
import Header from  "@/components/navigation/Header";
import { RenderRoutes } from "./components/navigation/RenderRoutes";
import { Toaster } from "@/components/ui/sonner";


function App() {
  return (
    <BrowserRouter>
      <AuthWrapper>
        <Header />
        <RenderRoutes/>
        <Toaster />
      </AuthWrapper>
    </BrowserRouter>
  );
}

export default App;
