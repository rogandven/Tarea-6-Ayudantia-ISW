import { useState } from 'react';
import { getProfile } from '../services/profile.service.js';
import EditingForm from '../components/EditingForm.jsx';
import DeleteForm from '../components/DeleteForm.jsx';
import ButtonContainer from '../components/ButtonContainer.jsx';
import ProfileContainer from '../components/ProfileContainer.jsx';

const Home = () => {
  const DEFAULT_TEXT = "Página de Inicio";
  const EDITING_TEXT = "Editar Perfil";
  const DELETING_TEXT = "Eliminar Perfil";

  const [profileData, setProfileData] = useState(null);

  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const titleText = () => {
    if (isEditing) {
      return EDITING_TEXT;
    }
    if (isDeleting) {
      return DELETING_TEXT;
    }
    return DEFAULT_TEXT;
  }

  const DEFAULT_PROFILE_TEXT = "Obtener Perfil";
  const HIDE_PROFILE_TEXT = "Ocultar Perfil";

  const handleEditingState = () => {
    setProfileData(null);
    setIsEditing(true);
  }

  const handleDeleteProfile = () => {
    setProfileData(null);
    setIsDeleting(true);
  }

  const handleGetProfile = async () => {
    if (profileData !== null) {
      setProfileData(null);

      return;
    }

    setProfileData(await getProfile());
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-indigo-600 to-blue-600 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 w-full max-w-2xl transform transition-all hover:scale-105">
        <div className='flex flex-row justify-evenly'>
          <h1 className="text-4xl md:text-4xl font-bold text-gray-800 mb-8 mr-4 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600">
            {titleText()}
          </h1>
          { !isDeleting && !isEditing && (
              <ButtonContainer handleEditingState={handleEditingState} handleDeleteProfile={handleDeleteProfile}></ButtonContainer>
            )
          }     
        </div>
        { !isDeleting && !isEditing && (
            <ProfileContainer handleGetProfile={handleGetProfile} profileData={profileData} DEFAULT_PROFILE_TEXT={DEFAULT_PROFILE_TEXT} HIDE_PROFILE_TEXT={HIDE_PROFILE_TEXT}></ProfileContainer>
          )
        }
        {
          isEditing && (
            <EditingForm setIsEditing={setIsEditing}></EditingForm>
          )
        }
        {
          isDeleting && (
            <DeleteForm setIsDeleting={setIsDeleting}></DeleteForm>
          )
        }
      </div>
    </div>
  );
};

export default Home;
