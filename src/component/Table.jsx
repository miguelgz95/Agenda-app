import useContacts from "../hooks/useContacts";
import { useNavigate } from "react-router";

export default function Table({ contact }) {
  const { deleteContact } = useContacts();
  function remove(){
    deleteContact(contact.email);
  }
  const navigate = useNavigate();

  function editContact(){
    navigate("/contacto/" + contact.email)
  }


  return (
    <tr>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <div className="flex items-center">
          <div className="flex-shrink-0 w-10 h-10">
            <img
              className="w-full h-full rounded-full"
              src={contact.picture.thumbnail}
              alt=""
            />
          </div>
          <div className="ml-3">
            <p className="text-gray-900 whitespace-no-wrap">
              {contact.name.first} {contact.name.last}
            </p>
          </div>
        </div>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 whitespace-no-wrap">{contact.phone}</p>
      </td>

      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <span onClick={editContact} className="hover:opacity-80 cursor-pointer relative inline-block px-3 py-1 font-semibold text-yellow-900 leading-tight mr-2">
          <span
            
            aria-hidden
            className="absolute inset-0 bg-yellow-400 opacity-50 rounded-full"
          ></span>
          <span className="relative">editar</span>
        </span>
        <span className="hover:opacity-80 cursor-pointer relative inline-block px-3 py-1 font-semibold text-red-900 leading-tight">
          <span
            aria-hidden
            className="absolute inset-0 bg-red-400 opacity-50 rounded-full"
          ></span>
          <span onClick={remove}className="relative">eliminar</span>
        </span>
      </td>
    </tr>
  );
}
