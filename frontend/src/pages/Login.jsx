import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/auth.service';

const REGISTER_PATH = "/register"

const errorMessage = (message) => {
    if (!message || !message.toString) {
        message = "Error desconocido"; 
    }

    return "❌ " + message.toString();
}

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleRegister = (e) => {
       e.preventDefault();
       navigate(REGISTER_PATH);
    }

    const handleSubmit = async (e) => {
        setMessage("");

        e.preventDefault();
        // console.log({ email, password });
        try {
            const response = await login({email, password});
            // alert(JSON.stringify(response.status));
            if (response.status === 200) {
                navigate("/home");
            } else {
                setMessage(errorMessage("Usuario o clave incorrectos"));
            }
        } catch (error) {
            setMessage(errorMessage("Error al conectar con la base de datos"));
        }
    };    
    
    
    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-600 via-indigo-600 to-blue-600 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 w-full max-w-md transform transition-all hover:scale-105">
                <form className="space-y-6" onSubmit={handleSubmit}>
                    <h1 className="text-4xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600 mb-8">
                        Iniciar sesión
                    </h1>
                    
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
                        <label htmlFor="password" className="block text-sm font-semibold text-gray-700">
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

                    <button 
                        type="submit" 
                        className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-purple-300"
                    >
                        Iniciar sesión
                    </button>

                    <p className='text-red-600 text-2xl w-full h-full text-center'>{message}</p>
                    <p className='text-center'>¿No tienes cuenta? <a className='text-purple-600' onClick={handleRegister} href={REGISTER_PATH}>¡Regístrate!</a></p>
                </form>
            </div>
        </div>
    );
}

export default Login;
