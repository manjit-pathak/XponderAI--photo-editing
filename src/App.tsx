import { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import ImageEditor from "./pages/ImageEditor";

function App() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <Routes>
        <Route path="/" element={<ImageEditor />} />
      </Routes>
    </Suspense>
  );
}

export default App;
