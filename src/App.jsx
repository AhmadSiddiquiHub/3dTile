import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

// Pages
import HomePage from "./pages/HomePage";
import TileDesignPage from "./pages/TileDesignPage";
import TileModelPage from "./pages/TileModelPage";

// Components
import Header from "./components/Header";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  return (
    <Router>
      <main className="select-none ">
        {/* <main> */}
        <Header />
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/tile_design" element={<TileDesignPage />} />
          <Route path="/tile_model/:id" element={<TileModelPage />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
