export const ButtonContainer = ({handleEditProfile, handleDeleteProfile}) => {
    return (
    <div>
        <button 
            onClick={handleEditProfile}
            className="mb-3 mr-3 bg-gradient-to-r from-green-800 to-green-600 hover:from-green-500 hover:to-green-400 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-purple-300"
        >Editar</button>        
        <button 
            onClick={handleDeleteProfile}
            className="mb-3 bg-gradient-to-r from-red-900 to-red-700 hover:from-red-600 hover:to-red-500 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-purple-300 text-center text-wrap"
        >Borrar</button>
    </div>
    )
}

export default ButtonContainer;