import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminLogin from './pages/Admin/AdminLogin/AdminLogin';
import AdminRegister from './pages/Admin/AdminRegister/AdminRegister';
import { ToastContainer } from 'react-toastify';
import Register from './pages/ExteralUser/Register';
import Login from './pages/ExteralUser/Login';
import HomePage from './pages/ExteralUser/HomePage';
import 'react-toastify/dist/ReactToastify.css';
import SalesForm from './pages/Admin/saleForm/SalesForm';
import './App.css';
import { Navbar, Footer, Sidebar, ThemeSettings } from './components/Admin';

import { useStateContext } from './contexts/ContextProvider';
import { FiSettings } from 'react-icons/fi';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';

import {
  Orders,
  Calendar,
  Employees,
  Stacked,
  Pyramid,
  Customers,
  Kanban,
  Line,
  Area,
  Bar,
  Pie,
  Financial,
  ColorPicker,
  ColorMapping,
  Editor,
} from '../src/pages/Admin';

import Dashboard from './pages/Admin/DashBoard/Dashboard';

function App() {
  const {
    setCurrentColor,
    setCurrentMode,
    currentMode,
    activeMenu,
    currentColor,
    themeSettings,
    setThemeSettings,
  } = useStateContext();

  useEffect(() => {
    const currentThemeColor = localStorage.getItem('colorMode');
    const currentThemeMode = localStorage.getItem('themeMode');
    if (currentThemeColor && currentThemeMode) {
      setCurrentColor(currentThemeColor);
      setCurrentMode(currentThemeMode);
    }
  }, [setCurrentColor, setCurrentMode]);

  return (
    <div className={currentMode === 'Dark' ? 'dark' : ''}>
      <Router>
        <div className="flex relative dark:bg-main-dark-bg">
          <div className="fixed right-4 bottom-4" style={{ zIndex: '1000' }}>
            <TooltipComponent content="Settings" position="Top">
              <button
                type="button"
                onClick={() => setThemeSettings(true)}
                style={{ background: currentColor, borderRadius: '50%' }}
                className="text-3xl text-white p-3 hover:drop-shadow-xl hover:bg-light-gray"
              >
                <FiSettings />
              </button>
            </TooltipComponent>
          </div>
          {activeMenu ? (
            <div className="w-72 fixed sidebar dark:bg-secondary-dark-bg bg-white ">
              <Sidebar />
            </div>
          ) : (
            <div className="w-0 dark:bg-secondary-dark-bg">
              <Sidebar />
            </div>
          )}
          <div
            className={
              activeMenu
                ? 'dark:bg-main-dark-bg  bg-main-bg min-h-screen md:ml-72 w-full  '
                : 'bg-main-bg dark:bg-main-dark-bg  w-full min-h-screen flex-2 '
            }
          >
            <div className="fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full ">
              <Navbar />
            </div>
            <div>
              {themeSettings && <ThemeSettings />}
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                <Route path="/admin_3xyftvk/login" element={<AdminLogin />} />
                <Route
                  path="/admin_3xyftvk/register"
                  element={<AdminRegister />}
                />
                <Route
                  path="/admin_3xyftvk/dashboard"
                  element={<Dashboard />}
                />
                {/* pages  */}
                <Route path="/admin_3xyftvk/sales" element={<SalesForm />} />
                <Route path="/admin_3xyftvk/orders" element={<Orders />} />
                <Route
                  path="/admin_3xyftvk/employees"
                  element={<Employees />}
                />
                <Route
                  path="/admin_3xyftvk/customers"
                  element={<Customers />}
                />
                {/* apps  */}
                <Route path="/admin_3xyftvk/kanban" element={<Kanban />} />
                <Route path="/admin_3xyftvk/editor" element={<Editor />} />
                <Route path="/admin_3xyftvk/calendar" element={<Calendar />} />
                <Route
                  path="/admin_3xyftvk/color-picker"
                  element={<ColorPicker />}
                />

                {/* charts  */}
                <Route path="/admin_3xyftvk/line" element={<Line />} />
                <Route path="/admin_3xyftvk/area" element={<Area />} />
                <Route path="/admin_3xyftvk/bar" element={<Bar />} />
                <Route path="/admin_3xyftvk/pie" element={<Pie />} />
                <Route
                  path="/admin_3xyftvk/financial"
                  element={<Financial />}
                />
                <Route
                  path="/admin_3xyftvk/color-mapping"
                  element={<ColorMapping />}
                />
                <Route path="/admin_3xyftvk/pyramid" element={<Pyramid />} />
                <Route path="/admin_3xyftvk/stacked" element={<Stacked />} />
              </Routes>
            </div>
            <Footer />
            <ToastContainer />
          </div>
        </div>
      </Router>
    </div>
  );
}

export default App;
