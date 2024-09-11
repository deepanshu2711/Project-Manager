import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Landing } from "./components/landing/landing";
import { SignIn } from "./pages/signin";
import { SignUp } from "./pages/signup";
import { Dashboard } from "./pages/dashboard";
import { CreateOrg } from "./pages/createorg";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="createorg" element={<CreateOrg />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
