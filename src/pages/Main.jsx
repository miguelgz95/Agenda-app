import { useEffect } from "react";
import Table from "../component/Table";

import useContacts from "../hooks/useContacts";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router";
import { useState } from "react";
import { NavLink } from "react-router-dom";

function Main() {
  const { fetchContacts, getContacts } = useContacts();

  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [filtro, setFiltro] = useState("");

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    } else {
        if(!contacts.length){
            fetchContacts();
        }
    }
  }, []);

  const contacts = getContacts(page, filtro);
  const nextPage = () => {
    setPage(page+1);
  }
  const prevPage = () => {
    setPage(page-1);
  }
  function createContact(){
    navigate("/crear");
  }

  return (
    <div className="bg-gray-200 flex flex-col w-full items-center p-10 min-h-screen">
      <div className="flex max-w-xl flex-col w-full">
        <h1 className="text-5xl font-bold self-center mb-4">
          Agenda de contactos
        </h1>
        <div className="flex w-full bg-gray-100 rounded-lg p-4 text-gray-600 mb-4 justify-between items-center">
          <div className="relative text-gray-600">
            <input
              className="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-full text-sm focus:outline-none"
              type="search"
              name="search"
              value={filtro}
              onChange={(e) => setFiltro(e.target.value)}
              placeholder="Buscar contacto"
            />
            <button type="submit" className="absolute right-0 top-0 mt-3 mr-4">
              <svg
                className="text-gray-600 h-4 w-4 fill-current"
                id="Capa_1"
                x="0px"
                y="0px"
                viewBox="0 0 56.966 56.966"
                width="512px"
                height="512px"
              >
                <path d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z" />
              </svg>
            </button>
          </div>

          <div onClick={createContact} className="flex rounded-full px-4 py-1 bg-gray-300 font-semibold text-sm cursor-pointer hover:opacity-80">
            Añadir contacto
          </div>
        </div>
        <table className="bg-white rounded-lg overflow-hidden">
          <thead>
            <tr>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Nombre
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Teléfono
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"></th>
            </tr>
          </thead>
          <tbody>
            {contacts.map((contact) => (
              <Table key={contact.email} contact={contact} />
            ))}
          </tbody>
        </table>

        
          <div className="flex w-full bg-gray-100 rounded-lg p-4 text-gray-600 mb-4 justify-between items-center mt-4">
            <div className="relative text-gray-600"></div>

            <div className="flex">
              {page > 0 && (
                <div onClick={prevPage} className="flex rounded-full px-4 py-1 bg-gray-300 font-semibold text-sm cursor-pointer hover:opacity-80 mr-2">
                  Anterior
                </div>
              )}
              {contacts.length >= 10 && (
                <div onClick={nextPage} className="flex rounded-full px-4 py-1 bg-gray-300 font-semibold text-sm cursor-pointer hover:opacity-80">
                  Siguiente
                </div>
              )}
            </div>
          </div>
        
      </div>
    </div>
  );
}

export default Main;
