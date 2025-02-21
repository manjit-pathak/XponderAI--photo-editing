import { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage";

function App() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </Suspense>
  );
}

export default App;
