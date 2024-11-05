import React from "react";
import { ToastContainer } from "react-toastify"
import { Navigation } from "./routes";
import { AuthProvider } from "./context"
//import { BrowserRouter as Router } from 'react-router-dom';
//import ReactDOM from 'react-dom';
//import App from './App';
/*import { ClientLayout } from "./layouts";*/

export default function App() {
  return (
    <AuthProvider>
        <Navigation />

        <ToastContainer
          position="bottom-center"
          autoClose = {5000}
          hideProgressBar
          newestOnTop
          closeOnClick
          rtl = {false}
          pauseOnFocusLoss
          draggable
          pauseOnHover={false}
        />
    </AuthProvider>
  );
}
