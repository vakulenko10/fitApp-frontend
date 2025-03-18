import { BrowserRouter } from "react-router-dom";
import { AuthWrapper } from "./components/auth/AuthWrapper";
import Header from "./components/navigation/Header";



function App() {
  return (
    <BrowserRouter>
      <AuthWrapper>
        <Header />
      </AuthWrapper>
    </BrowserRouter>
  );
}

export default App;
