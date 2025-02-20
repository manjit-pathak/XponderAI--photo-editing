import { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import ImageEditor from "./pages/ImageEditor";
import { ChatInterface } from "./components/ChatInterface";

function App() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <Routes>
        <Route path="/" element={<ImageEditor />} />
      </Routes>
      <ChatInterface />
    </Suspense>
  );
}

export default App;
