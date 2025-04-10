// File: src/App.tsx
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import BeneficiaryList from "./components/BeneficiaryList";
import BeneficiaryForm from "./components/BeneficiaryForm";
import BeneficiaryView from "./components/BeneficiaryView";
import './App.css';
import { Provider } from "react-redux";
import {store} from "../src/store";

const App: React.FC = () => {
  return (
    <Provider store={store}>
    <Router>
      <div className="app-container">
        <Routes>
          <Route path="/" element={<BeneficiaryList />} />
          <Route path="/add" element={<BeneficiaryForm />} />
          <Route path="/edit/:id" element={<BeneficiaryForm />} />
          <Route path="/view/:id" element={<BeneficiaryView />} />
        </Routes>
      </div>
    </Router>
    </Provider>
  );
}

export default App;
