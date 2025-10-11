import examplePFP from "./images/cat_example_pfp.png";

const Profile = ({ profile }) => {
    const initialState = "";
    if (!profile) {
        return initialState;
    }

    const returnProfileRow = (label, data) => {
        if (data && data.toString) {
            return (
                <p className='text-left text-wrap break-all'><b>{label}</b>{": " + (data.toString())}</p>
            )
        }
        return "";
    }

    const errorMessage = (
        <p className='text-red-600 w-full h-full text-center'>❌ Error al obtener perfil</p>
    );

    const parseUnixDate = (date) => {
        const defaultDate = "01/01/1970";
        
        if (!date) {
            return defaultDate;
        }

        date = parseInt(date) * 1000;

        try {
            const formattedDate = new Date(date);
            if (!formattedDate) {
                return defaultDate;
            }

            return (formattedDate.getDate().toString()) + "/" + ((formattedDate.getUTCMonth() + 1).toString()) + "/" + (formattedDate.getFullYear());
        } catch (error) {
            console.error(error);
            return defaultDate;
        }
    }

    const formattedProfile = (profile) => {
        if (!profile) {
            return "";
        }

        return (
            <div>
                <p className='text-green-600 w-full h-full text-center'>✅ {profile.message || "Se entregó un perfil, pero este mensaje no debería aparecer"}</p>
                <p className='text-center w-full'>{profile.data.message || "¡No se encontró el perfil! Se mostrarán datos de ejemplo:"}</p>
                <div className='m-4 bg-gray-50 rounded-xl p-4 border border-gray-200 flex flex-row'>
                    <div className='mr-4 size-2/3 rounded-full border brder-gray200 shadow shadow-black'>
                        <img src={examplePFP} className='w-max h-max size-max object-fill rounded-full'></img>
                    </div>
                    <div>
                        {returnProfileRow("ID", profile.data.userData.sub || 0)}
                        {returnProfileRow("Correo", profile.data.userData.email || "johndoe@gmail.com")}
                        {returnProfileRow("Última visita", parseUnixDate(profile.data.userData.iat))}
                        {returnProfileRow("Expiración", parseUnixDate(profile.data.userData.exp))}
                        {returnProfileRow("Contraseña", profile.data.userData.password || "ifeelsocleanlikeamoneymachine")}
                    </div>
                </div>
            </div>
        )
    }

    if (profile.status && profile.status === "Success") {
        return formattedProfile(profile);
    }

    return errorMessage;
};

export default Profile;