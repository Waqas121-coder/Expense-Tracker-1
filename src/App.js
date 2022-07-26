import React, { useEffect } from 'react';
import './App.css';
import Dashboard from "./component/Dashboard";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import MonthlyChart from './component/MonthlyChart';
import DailyChart from './component/DailyChart';
import Day from "./component/Day";
import DayData from "./component/DayData";
import MonthData from "./component/MonthData";
import YearData from "./component/YearData";

import { BrowserRouter, Routes, Route } from "react-router-dom";

var showToast

function App() {

  showToast = message => {
    toast.dark(message, {
      position: "bottom-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }

  return (
      <div>
        <ToastContainer
          position="bottom-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Dashboard />} />
            <Route path='/PDF' element={<DayData />} />
            <Route path='/Month' element={<MonthData />} />
            <Route path='/Year' element={<YearData />} />
          </Routes>
        </BrowserRouter>
      </div>
  );
}

export default App;
export { showToast }
