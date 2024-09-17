import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Landing } from "./components/landing/landing";
import { SignIn } from "./pages/signin";
import { SignUp } from "./pages/signup";
import { Dashboard } from "./pages/dashboard";
import { CreateOrg } from "./pages/createorg";
import { MainLayout } from "./components/MainLayout/mainLayout";
import { OrgDashboard } from "./pages/orgDashbaord";
import { ProjectDashboard } from "./components/Orgs/Project/projectDashboard";
import { Provider } from "react-redux";
import { store } from "./redux/store";
function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="createorg" element={<CreateOrg />} />
          <Route
            path="/dashboard"
            element={
              <MainLayout>
                <Dashboard />
              </MainLayout>
            }
          />
          <Route
            path="/org/:orgId"
            element={
              <MainLayout>
                <OrgDashboard />
              </MainLayout>
            }
          />
          <Route
            path="/org/:orgId/project/:projectId"
            element={
              <MainLayout>
                <ProjectDashboard />
              </MainLayout>
            }
          />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
