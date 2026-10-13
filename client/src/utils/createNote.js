import axios from "axios"

const createNote = async ({title, details}) => {
    try {
      const note = await axios.post('/api/notes', { title, details })
      return note
    } catch (error) {
      console.log(error)
    }
}

export default createNote