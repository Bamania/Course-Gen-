// function App() {
//   return (

//     <Router>
//         <Routes>
//           <Route path="/" element={<Dashboard/>} />
//           <Route path="/selectTopic" element={<SelectTopic/>} />
//           {/* <Route path="/orderdetails/:orderId" element={<OrderDetails/>} /> */}
//         </Routes>
//       </Router>
//   );
// }

import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Dashboard from "./Components/Dashboard/Index";
import SelectTopic from "./Components/SelectTopic";
import { AuthLayout } from "./Components/AuthLayout.jsx";
import { SignIn } from "./Components/SignIn";
import { SignUp } from "./Components/SignUp";
import { Temp } from "./Components/temp";
import CourseData from "./Components/Course/index.jsx";
import DisplayCourse from "./Components/DisplayCourse/index.jsx";

function App() {
  // You can replace this with your actual auth check
  const isAuthenticated = false;

  return (
    <Router>
      <Routes>
        {/* Auth Routes */}
        <Route
          path="/signin"
          element={
            <AuthLayout title="Welcome Back" subtitle="Sign in to continue">
              <SignIn />
            </AuthLayout>
          }
        />
        <Route path="/" element={<Dashboard />} />
        <Route path="/selectTopic" element={<SelectTopic />} />
        <Route path="/displayCourse" element={<DisplayCourse />} />
        <Route path="/course" element={<CourseData />} />
        <Route
          path="/signup"
          element={
            <AuthLayout
              title="Create Account"
              subtitle="Sign up to get started"
            >
              <SignUp />
            </AuthLayout>
          }
        />

        {/* Protected Routes */}
        <Route
          path="/asdsad"
          element={
            isAuthenticated ? <Temp /> : <Navigate to="/signin" replace />
          }
        />
        <Route
          path="/wqeqwe"
          element={
            isAuthenticated ? <Temp /> : <Navigate to="/signin" replace />
          }
        />

        {/* Catch all route - redirect to signin */}
        <Route path="*" element={<Navigate to="/signin" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
