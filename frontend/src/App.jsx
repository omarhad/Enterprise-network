import React, { useEffect, useState } from "react";
import Login from "./pages/Login";
import Pages from "./pages";

export default function App() {
  // Declare a new state variable, to verify if the user is logged in
  const [isConnect, setIsConnect] = useState(null);

  useEffect(() => {
    // Check if the user is logged in
    const user = localStorage.getItem("user");
    if (user) {
      setIsConnect(true);
    } else {
      setIsConnect(false);
    }
  }, [isConnect]);

  if (isConnect === null) {
    return null;
  }

  return (
    <>
      {isConnect ? (
        <Pages onConnect={setIsConnect} />
      ) : (
        <Login onConnect={setIsConnect} />
      )}
    </>
  );
}
