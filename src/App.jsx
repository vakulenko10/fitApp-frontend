import { BrowserRouter } from "react-router-dom";
import { AuthWrapper } from "./components/auth/AuthWrapper";
import Header from "./components/Header";
import { RenderRoutes } from "./components/navigation/RenderRoutes";
import { Button } from "./components/ui/button";
import ThemeDisplayed from "./components/ThemeDisplayed";



function App() {
  const handleClick = (data) => {
    toast(data.title, {
      description: data.description,
      action: data.action, // Optional: Custom action button
      duration: data.duration || 5000, // Default duration 5s
      className: 'visible'
    });
  };

  return (
    <AuthWrapper>
      <BrowserRouter>
        <Header />
        <ThemeDisplayed/>
      </BrowserRouter>
    </AuthWrapper>
  );
}

export default App;
