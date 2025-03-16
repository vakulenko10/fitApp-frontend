import { BrowserRouter } from "react-router-dom";
import { AuthWrapper } from "./components/auth/AuthWrapper";
import Header from "./components/Header";
import { RenderRoutes } from "./components/navigation/RenderRoutes";



function App() {
  return (
    <AuthWrapper>
      <BrowserRouter>
        <Header />
        <RenderRoutes />
      </BrowserRouter>
    </AuthWrapper>
  );
}

export default App;
