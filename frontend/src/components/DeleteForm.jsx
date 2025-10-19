import { useState } from 'react';
import GenericMessage from "../components/GenericMessage.jsx";
import { deleteProfile } from '../services/profile.service.js';
import { logout } from '../services/auth.service.js';
import { useNavigate } from 'react-router-dom';


export const DeleteForm = ({setIsDeleting}) => {
    const navigate = useNavigate();
    const UNKNOWN_MESSAGE = "Error desconocido";
    const UNKNOWN_SUCCESS = "La operación se realizó con éxito";
    const [errorMessage, setErrorMessage] = useState(UNKNOWN_MESSAGE);
    const [errorStatus, setErrorStatus] = useState(true);
    const [errorVisible, setErrorVisible] = useState(false);
    const [navigator, setNavigator] = useState("");
    const setError = (error) => {
        if (!error) {
            error = UNKNOWN_MESSAGE;
        }
        setErrorMessage(error);
        setErrorStatus(false);
        setErrorVisible(true);
    }

    const setSuccess = (success) => {
        if (!success) {
            success = UNKNOWN_SUCCESS;
        }
        setErrorMessage(success);
        setErrorStatus(true);
        setErrorVisible(true);
    }

    const hideMessages = () => {
        setErrorMessage(error);
        setErrorStatus(false);
        setErrorVisible(false);
    }

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    const deleteProfileHandler = async (e) => {
        e.preventDefault();
        // console.log({ email, password });
        try {
            const response = await deleteProfile();
            if (!response) {
                setError(null);
                return;
            }
            if (!response.status) {
                setError(null);
                return;
            }
            // console.log(response.status);
            if (response.status !== 200 && response.status !== "Success") {
                setError(response.message || null);
                return;
            }
            await logout();
            navigate("/");
        } catch (error) {
            setError(null);
            return;
        }
    }
    
    const noLongerDeleting = () => {
        setIsDeleting(false);
    }
    
    return (           
        <form>
            {navigator}
            <p className="text-gray-600 text-center text-lg mb-8">
            ¿Está seguro que desea eliminar este perfil?
            </p>
              <div className='flex flex-row mb-4'>
                  <button 
                      type="button" 
                      className="mr-2 w-full bg-gradient-to-r from-green-800 to-green-600 hover:from-green-500 hover:to-green-400 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-purple-300"
                      onClick={deleteProfileHandler}
                  >
                      Si
                  </button>
                  <button 
                      type="button" 
                      className="ml-2 w-full bg-gradient-to-r from-red-900 to-red-700 hover:from-red-600 hover:to-red-500 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-purple-300"
                      onClick={noLongerDeleting}
                  >
                      No
                  </button>
              </div>

              <GenericMessage message={errorMessage} status={errorStatus} visible={errorVisible}></GenericMessage>
        </form>
)};

export default DeleteForm;