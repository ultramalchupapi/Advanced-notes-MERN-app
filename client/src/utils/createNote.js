import api from "./api"

const createNote = async ({title, details}) => {
    const { data } = await api.post('/api/notes', { title, details })
    return data
}

export default createNote