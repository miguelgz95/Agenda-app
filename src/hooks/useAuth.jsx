import { AgendaContext } from "./AgendaContext"
import { useNavigate } from "react-router";
import { useContext } from "react";

function useAuth (){
    const [state, setState] = useContext(AgendaContext)
    const navigate = useNavigate();

    function login(values){
        const users = state.users;
        let result = false;
        users.forEach(element => {
            if(element.username == values.username && element.password == values.password){
                setState((state) => ({...state, loggedIn: true}));
                result = true;
            }
        });
        return result;
    }
    return{
        login,
        isLoggedIn: state.loggedIn,
    }
}

export default useAuth;