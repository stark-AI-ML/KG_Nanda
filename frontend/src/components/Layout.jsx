import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import FloatingActions from "./Map/FloatingActions";
import HelplineDesk from "./HelplineDesk/HelplineDesk";
import WhatsAppFloatPage from "../Pages/WhatsAppFloat";

const Layout = () => {
    return (
        <div className="layout-container">
            {/* Header */}
            <Header />

            {/* Main Content */}
            <main className="main-content">
                <Outlet />
            </main>

            <HelplineDesk />
            <FloatingActions />
            <WhatsAppFloatPage />

            {/* Footer */}
            <Footer />
        </div>
    );
};

export default Layout;
