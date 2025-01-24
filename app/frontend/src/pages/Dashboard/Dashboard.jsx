import React from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";

const Dashboard = () => {
  return (
    <>
      <Header />
      <div className="d-flex flex-column align-items-center justify-content-center vh-100 bg-light">
        <h1 className="display-4 fw-bold text-dark">Bem-vindo ao Dashboard</h1>
        <p className="text-muted mt-3">Aqui será exibido o conteúdo principal.</p>
      </div>
      <Footer />
    </>
  );
};

export default Dashboard;
