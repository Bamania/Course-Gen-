
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

import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
// import Dashboard from './Components/Dashboard/Index';
// import SelectTopic from './Components/SelectTopic';
import { AuthLayout } from './components/AuthLayout';
import { SignIn } from './components/SignIn';
import { SignUp } from './components/SignUp';
import { Temp } from './components/temp';

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
        <Route
          path="/signup"
          element={
            <AuthLayout title="Create Account" subtitle="Sign up to get started">
              <SignUp />
            </AuthLayout>
          }
        />

        {/* Protected Routes */}
        <Route
          path="/"
          element={
            isAuthenticated ? <Temp />: <Navigate to="/signin" replace />
          }
        />
        <Route
          path="/selectTopic"
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