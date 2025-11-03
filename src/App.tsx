import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import MainstackLogo from "./assets/icons/mainstack-logo.svg";
function App() {
  const faviconLink = document.querySelector(
    "link[rel='icon']"
  ) as HTMLLinkElement;
  if (faviconLink) {
    faviconLink.href = MainstackLogo;
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
