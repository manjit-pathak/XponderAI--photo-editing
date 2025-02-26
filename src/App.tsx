import { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import LandingPage from "./components/LandingPage";

function App() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/editor" element={<HomePage />} />
      </Routes>
    </Suspense>
  );
}

export default App;
