import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from '../services/auth.service';

const EXIT_PATH = "/";

const errorMessage = (message) => {
    if (!message || !message.toString) {
        message = "Error desconocido"; 
    }

    return "❌ " + message.toString();
}

const returnOppositeVisibility = (attribute) => {
    if (!attribute) {
        return "hidden";
    } else if (attribute === "hidden") {
        return "visible";
    } else if (attribute === "visible") {
        return "hidden";
    } else return "hidden";
}

const Register = () => {
    const handleExit = (e) => {
       e.preventDefault();
       navigate(EXIT_PATH);
    }

    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [registerSuccess, setRegisterSuccess] = useState("visible");

    const handleSubmit = async (e) => {
        setMessage("");

        e.preventDefault();
        // console.log({ email, password });
        try {
            const response = await register({email, password});
            if (!response) {
                setMessage(errorMessage("Error desconocido"));
                return;
            }
            if (!response.status) {
                setMessage(errorMessage("Error desconocido"));
                return;
            }
            if (response.status !== "Success") {
                setMessage(errorMessage(response.message));
                return;
            }

            setRegisterSuccess("hidden");
        } catch (error) {
            setMessage(errorMessage("Error al conectar con la base de datos"));
        }
    };    
    
    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-600 via-indigo-600 to-blue-600 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 w-full max-w-md transform transition-all hover:scale-105">
                <form className={"space-y-6 " + registerSuccess} onSubmit={handleSubmit}>
                    <h1 className="text-4xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600 mb-8"
                        
                    >
                        Regístrate
                    </h1>
                    
                    <div className="space-y-2"
                        
                    >
                        <label htmlFor="email" className="block text-sm font-semibold text-gray-700"
                            
                        >
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
                            type="submit" 
                            className="mr-2 w-full bg-gradient-to-r from-green-800 to-green-600 hover:from-green-500 hover:to-green-400 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-purple-300"
                            
                        >
                            Registrar
                        </button>
                        <button 
                            type="button" 
                            className="ml-2 w-full bg-gradient-to-r from-red-900 to-red-700 hover:from-red-600 hover:to-red-500 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-purple-300"
                            
                        ><a href={EXIT_PATH} onClick={handleExit}>
                            Salir
                        </a>
                        </button>
                    </div>

                    <p className='text-red-600 text-2xl w-full text-center'>{message}</p>
                </form>
                <div className={returnOppositeVisibility(registerSuccess)}>
                    <p className='text-green-600 my-2 text-2xl w-full text-center'>✅ ¡Usuario registrado con éxito!</p>
                        <button 
                            type="button" 
                            className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-purple-300"
                            
                        ><a href={EXIT_PATH} onCLick={handleExit}>
                            Volver
                        </a>
                        </button>
                </div> 
            </div>
        </div>
    );
}

export default Register;
