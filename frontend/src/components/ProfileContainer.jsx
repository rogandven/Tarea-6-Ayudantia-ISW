import { useState } from 'react';
import Profile from '../components/Profile';

export const ProfileContainer = ({handleGetProfile, profileData, DEFAULT_PROFILE_TEXT, HIDE_PROFILE_TEXT}) => {
    const profileText = (profileData) => {
        if (profileData) {
            return HIDE_PROFILE_TEXT;
        }
        return DEFAULT_PROFILE_TEXT; 
    }

    return (
        <div>
            <button 
            onClick={handleGetProfile} 
            className="w-full mb-3 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-purple-300"
            >
            {profileText(profileData)}
            </button>
            <Profile profile = {profileData}></Profile>
        </div>
    )
}

export default ProfileContainer;