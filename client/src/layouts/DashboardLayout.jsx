import React from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import SessionTimer from "../components/SessionTimer";

const DashboardLayout = ({ children, setIsAuthenticated }) => {

    const sessionDuration = 60 * 60 * 1000;

    return (
        <>
            <div className='flex flex-col sm:flex-row flex-auto h-screen'>
                <Sidebar setIsAuthenticated={setIsAuthenticated}/>
                <div className='grow'>
                    <Navbar />
                    <SessionTimer sessionDuration={sessionDuration}/>
                    <div className='m-5 overflow-auto'>{children}</div>
                </div>
            </div>
        </>
    )
}

export default DashboardLayout;
