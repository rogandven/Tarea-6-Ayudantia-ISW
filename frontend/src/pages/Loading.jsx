const Loading = () => {  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-indigo-600 to-blue-600 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-12 md:p-16 text-center max-w-2xl transform transition-all hover:scale-105">
        <p className="text-gray-600 text-lg mb-8">
          Cargando...
        </p>
      </div>
    </div>
  );
};

export default Loading;
