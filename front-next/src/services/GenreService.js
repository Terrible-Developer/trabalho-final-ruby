import axiosInstance from "../utils/axios"

const GenreService = {
  getAll: async () => {
    let response = await axiosInstance.get('/genres')
    return response.data
  },
  getById: async (id) => {
    if (!id) return

    let response = await axiosInstance.get(`/genres/${id}`)
    return response.data
  },
  create: async (genre) => {
    if (!genre) return

    let response = await axiosInstance.post(`/genres`, { genre: genre})
    return response.data
  },
  destroy: async (id) => {
    if (!id) return

    let response = await axiosInstance.delete(`/genres/${id}`)
    return response.data
  },
  update: async(id, genre) => {
    if (!id && !genre) return

    let response = await axiosInstance.put(`/genres/${id}`, { genre: genre })
    return response.data
  }
}

export default GenreService