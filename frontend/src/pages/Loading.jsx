import { Link } from 'react-router-dom';

const Loading = ({destination}) => {  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-indigo-600 to-blue-600 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-12 md:p-16 text-center max-w-2xl transform transition-all hover:scale-105">
        <h1 className="text-4xl md:text-4xl font-bold text-gray-800 mb-8 mr-4 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600">
          Cargando...
        </h1>
        <p className="text-center">¿No carga? Haga click <a className='text-purple-600' href={destination}>aquí</a> para llegar a su destino o 
        <a className='text-purple-600' href="/auth"> aquí </a>
         para volver al inicio.</p>
      </div>
    </div>
  );
};

export default Loading;
