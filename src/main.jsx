// main.jsx

import { createContext, useState } from "react";
import { createRoot } from "react-dom/client";

import App from "./App";

export const Context = createContext({
  isAuthorized: false,
  setIsAuthorized: () => {},
  user: {},
  setUser: () => {},
});

const AppWrapper = () => {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [user, setUser] = useState({});
  // console.log("🚀 ~ AppWrapper ~ user:", user)

  return (
    <Context.Provider value={{ isAuthorized, setIsAuthorized, user, setUser }}>
      <App />
    </Context.Provider>
  );
};

// Ensure root is created only once
const container = document.getElementById("root");
const root = createRoot(container);
root.render(<AppWrapper />);
