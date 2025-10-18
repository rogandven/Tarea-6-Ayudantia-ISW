export const EditingForm = ({handleEditProfile, editingEmail, setEditingEmail, setEditingPassword, editingPassword, setIsEditing}) => {
    const noLongerEditing = () => {
        setIsEditing(false);
    }
    
    return (<form className={"space-y-6"} onSubmit={handleEditProfile}>              
              <div className="space-y-2"
                  
              >
                  <label htmlFor="email" className="block text-sm font-semibold text-gray-700"
                      
                  >
                      Email
                  </label>
                  <input
                      type="email"
                      id="email"
                      value={editingEmail}
                      onChange={(e) => setEditingEmail(e.target.value)}
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
                      value={editingPassword}
                      onChange={(e) => setEditingPassword(e.target.value)}
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
                      Editar
                  </button>
                  <button 
                      type="button" 
                      className="ml-2 w-full bg-gradient-to-r from-red-900 to-red-700 hover:from-red-600 hover:to-red-500 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-purple-300"
                      
                  ><a href={null} onClick={noLongerEditing}>
                      Volver
                  </a>
                  </button>
              </div>

              <p className='text-red-600 text-2xl w-full text-center'>{null}</p>
        </form>
)};

export default EditingForm;