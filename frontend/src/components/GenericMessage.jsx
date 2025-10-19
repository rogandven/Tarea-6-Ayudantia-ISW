export const GenericMessage = ({message, status, visible}) => {
    if (!visible || !message) {
        return "";
    }
    if (!status) {
        return (
            <p className='text-red-600 text-2xl w-full h-full text-center'>{"❌ " + message}</p>
        )
    }
    return (
            <p className='text-green-600 text-2xl w-full h-full text-center'>{"✅ " + message}</p>
    )
};

export default GenericMessage;