import { BrowserRouter, Routes, Route } from "react-router-dom";

import SignupForm from "./components/SignupForm";
import Confirmation from "./components/Confirmation";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route
          path="/"
          element={<SignupForm />}
        />

        <Route
          path="/confirmation"
          element={<Confirmation />}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;