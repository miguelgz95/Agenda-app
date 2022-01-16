import {BrowserRouter, Route, Routes} from "react-router-dom";
import { AgendaProvider } from "./hooks/AgendaContext";
import EditContact from "./pages/EditContact";
import Login from "./pages/Login";
import Main from "./pages/Main";


function App() {
  return (
    <AgendaProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main/>}></Route>
        <Route path="/login" element={<Login/>}></Route>
        <Route path="/contacto/:email" element={<EditContact/>}></Route>
        <Route path="/crear" element={<EditContact/>}></Route>


      </Routes>
    </BrowserRouter>
    </AgendaProvider>
  );
}

export default App;
