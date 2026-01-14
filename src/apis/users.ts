import api from "./axios";

export const getUsers = async () => {
    try {
        const res = await api.get("/users");
        return res.data
    } catch (error) {
        return(error)
    }
}