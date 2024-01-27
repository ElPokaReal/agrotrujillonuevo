import React from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

const DashboardLayout = ({ children, setIsAuthenticated }) => {
    return (
        <>
            <div className='flex flex-auto h-screen'>
                <Sidebar setIsAuthenticated={setIsAuthenticated}/>
                <div className='grow'>
                    <Navbar />
                    <div className='m-5'>{children}</div>
                </div>
            </div>
        </>
    )
}

export default DashboardLayout;
