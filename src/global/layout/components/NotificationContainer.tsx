import { ToastContainer } from "react-toastify";

const NotificationContainer = () => {
    return (
        <>
            <ToastContainer position="top-right" autoClose={2000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="light" />
        </>
    )
}

export default NotificationContainer