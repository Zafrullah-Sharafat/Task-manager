import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Add from "./pages/Add";
import Edit from "./pages/Edit";
import Tasks from "./pages/Tasks";

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Tasks />} />
          <Route path="/add" element={<Add />} />
          <Route path="/edit/:taskId" element={<Edit />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
