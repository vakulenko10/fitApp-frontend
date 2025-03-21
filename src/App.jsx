import { BrowserRouter } from "react-router-dom";
import { AuthWrapper } from "@/components/auth/AuthWrapper";
import Header from  "@/components/navigation/Header";
import { RenderRoutes } from "./components/navigation/RenderRoutes";



function App() {
  return (
    <BrowserRouter>
      <AuthWrapper>
        <Header />
        <RenderRoutes/>
      </AuthWrapper>
    </BrowserRouter>
  );
}

export default App;
