import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import ErrorPage from "./pages/ErrorPage";
import StripeTest from "./routes/StripeTest";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import "./index.css";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />} errorElement={<ErrorPage />}>
          <Route index element={<Home />} />
          <Route path="/stripe-test" element={<StripeTest />} />
          <Route path="/contact" element={<Contact />} />
          {/* Add more nested routes as needed */}
        </Route>
        {/* If you have routes that should not use the Layout, define them outside of the Layout route */}
      </Routes>
    </Router>
  );
};

export default App;
