import { useState } from "react";
import React from "react";

const AgendaContext = React.createContext([{}, () => {}]);

const AgendaProvider = (props) => {
  const [state, setState] = useState({
    contacts: [],
    users: [{username: "salvador", password:"1234" }],
    loggedIn: false,
  });
  return (
    <AgendaContext.Provider value={[state, setState]}>
      {props.children}
    </AgendaContext.Provider>
  );
};

export { AgendaContext, AgendaProvider };
