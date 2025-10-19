import { useState } from 'react';
import GenericMessage from "../components/GenericMessage.jsx";
import { editProfile } from '../services/profile.service.js';

export const EditingForm = ({setIsEditing}) => {
    const UNKNOWN_MESSAGE = "Error desconocido";
    const UNKNOWN_SUCCESS = "La operación se realizó con éxito";
    const [errorMessage, setErrorMessage] = useState(UNKNOWN_MESSAGE);
    const [errorStatus, setErrorStatus] = useState(true);
    const [errorVisible, setErrorVisible] = useState(false);

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
    
    const sendEditedData = async (e) => {
        e.preventDefault();
        // console.log({ email, password });
        try {
            const response = await editProfile({email, password});
            if (!response) {
                setError(null);
                return;
            }
            console.log(response.status || "Estado no encontrado");
            if (response.status && response.status === "Success") {
                setSuccess(response.message || null);
                return;
            } else {
                setError(response.message || null);
                return;
            }
        } catch (error) {
            setError(null);
            return;
        }
    }
    
    const noLongerEditing = () => {
        setIsEditing(false);
    }
    
    return (<form className={"space-y-6"}>              
              <div className="space-y-2">
                  <label htmlFor="email" className="block text-sm font-semibold text-gray-700">
                      Email
                  </label>
                  <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="usuario@ejemplo.com"
                      required
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-200 transition-all duration-300"
                  />
              </div>

              <div className="space-y-2">
                  <label htmlFor="password" className="block text-sm font-semibold text-gray-700"
                  >
                      Contraseña
                  </label>
                  <input
                      type="password"
                      id="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="**********"
                      required
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-200 transition-all duration-300"
                      
                  />
              </div>

              <div className='flex flex-row'>
                  <button 
                      type="button" 
                      className="mr-2 w-full bg-gradient-to-r from-green-800 to-green-600 hover:from-green-500 hover:to-green-400 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-purple-300"
                      onClick={sendEditedData}
                  >
                      Editar
                  </button>
                  <button 
                      type="button" 
                      className="ml-2 w-full bg-gradient-to-r from-red-900 to-red-700 hover:from-red-600 hover:to-red-500 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-purple-300"
                      onClick={noLongerEditing}
                  >
                      Volver
                  </button>
              </div>

              <GenericMessage message={errorMessage} status={errorStatus} visible={errorVisible}></GenericMessage>
        </form>
)};

export default EditingForm;