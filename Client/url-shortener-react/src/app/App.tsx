import React from 'react';
import {BrowserRouter} from "react-router-dom";
import Layout from "../components/Layout/Layout";
import {AuthProvider} from "../contexts/AuthContext";
import {AppRouter} from "./PrivateRoutes";

function App() {
  return (
          <BrowserRouter>
              <AuthProvider>
                  <Layout>
                    <AppRouter />
                  </Layout>
              </AuthProvider>
          </BrowserRouter>
  );
}

export default App;
