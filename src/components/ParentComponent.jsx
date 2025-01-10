import React, { useState } from "react";
import LoginPopup from "./LoginPopup";

const ParentComponent = () => {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <div>
      <button onClick={() => setShowLogin(true)}>Open Login</button>
      {showLogin && <LoginPopup setShowLogin={setShowLogin} />}
    </div>
  );
};

export default ParentComponent;
