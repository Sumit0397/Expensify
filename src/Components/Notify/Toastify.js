import { toast } from 'react-toastify';


export const passwordNotMatchedNotify = () => {
    toast.error("Password not matched!!", {
        position: "top-right",
        autoClose: 2998,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
    });
}

export const authenticationErrorNotify = (msg) => {
    toast.error(msg, {
        position: "top-right",
        autoClose: 2998,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
    });
}

export const sucessNotify = (msg) => {
    toast.success(msg, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
    });
}

export const errorNotify = (msg) => {
    toast.error(msg, {
        position: "top-right",
        autoClose: 2998,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
    });
}

export const infoNotify = (msg) => {
    toast.info(msg, {
        position: "top-right",
        autoClose: 2998,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
    });
}
