import React, { useState } from "react";
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";

function MainPage() {
 const [showRegistration, setShowRegistration] = useState(false);

 return (
    <>
      {showRegistration ? <RegisterForm setShowRegistration={setShowRegistration} /> : <LoginForm setShowRegistration={setShowRegistration} />}
    </>
 );
}

export default MainPage;
