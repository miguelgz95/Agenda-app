import { useContext } from "react";
import { AgendaContext } from "./AgendaContext";
import { useNavigate } from "react-router";




function useContacts() {
    const [state, setState] = useContext(AgendaContext)
    const navigate = useNavigate();

    function fetchContacts() {
      if(state.contacts.length === 0){
        const url = "https://randomuser.me/api/?results=25";
        fetch(url)
        .then( result => result.json())
        .then( data => {
          console.log(data.results)
          setState((state) => ({...state, contacts: data.results }));
        })
      }
      
      
        //setState((state) => ({ ...state, contacts: data }));
    }

  function getContacts(page, filtro) {
    let contactList = [];
    console.log(filtro);
    console.log(page)
    if(!filtro.length || !filtro || filtro == null){
      console.log("No filter");
      contactList = state.contacts;
    }
    else{
      page = 0;
      contactList =  state.contacts.filter((contact) => {
        const name = contact.name.first.toLowerCase();
        const lastName = contact.name.last.toLowerCase();

        return name.includes(filtro) || lastName.includes(filtro);
      });
    }
    //return contactList;
    console.log(state.contacts);
    if(contactList.length){
      return contactList.slice(page*10, page*10 + 10);
    }
    else {return []};
  }

  function getContact(email){
    return state.contacts.find((contact) => contact.email == email);
  }

  function deleteContact(email){
    setState((state) => ({...state, 
      contacts: state.contacts.filter((contact) => contact.email != email)
    }));
  }

  function updateContact(contacto, values){

    contacto.name.first = values.firstName;
    contacto.name.last = values.lastName;
    contacto.email = values.email;
    contacto.phone = values.telefono;
    contacto.picture.thumbnail = values.image;

    const newContacts = state.contacts.map((item) => {
      if(item.email == contacto.email){
        return contacto;
      }
      return item;
    })

    setState((state) => ({...state, contacts: newContacts}))


    navigate("/");
  }

  function createContact(values){
    const newContact = {
      name: {
        first: values.firstName,
        last: values.lastName
      },
      email: values.email,
      phone: values.telefono,
      picture: {
        thumbnail: values.image
      }
    }

    setState((state) => ({...state, contacts: [...state.contacts, newContact]}));


    navigate("/");

  }

  return {
      getContacts,
    fetchContacts,
    deleteContact,
    getContact,
    updateContact,
    createContact
  };
}


export default useContacts;
