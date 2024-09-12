import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Landing } from "./components/landing/landing";
import { SignIn } from "./pages/signin";
import { SignUp } from "./pages/signup";
import { Dashboard } from "./pages/dashboard";
import { CreateOrg } from "./pages/createorg";
import { UserProvider } from "./providers/userProvider";
function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="createorg" element={<CreateOrg />} />
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
