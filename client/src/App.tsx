import { Switch, Route } from "wouter";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import Pricing from "@/pages/Pricing";
import AIDemo from "@/pages/AIDemo";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CustomCursor from "@/components/layout/CustomCursor";
import LeadMagnetPopup from "@/components/layout/LeadMagnetPopup";
import { useTheme } from "@/hooks/useTheme";

function App() {
  const { theme } = useTheme();
  
  return (
    <div className={theme}>
      <TooltipProvider>
        <CustomCursor />
        <Header />
        <main>
          <Switch>
            <Route path="/" component={Home} />
            <Route path="/pricing" component={Pricing} />
            <Route path="/ai-demo" component={AIDemo} />
            <Route component={NotFound} />
          </Switch>
        </main>
        <Footer />
        <LeadMagnetPopup />
      </TooltipProvider>
    </div>
  );
}

export default App;
