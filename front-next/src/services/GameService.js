import axiosInstance from "../utils/axios"

const GameService = {
  getAll: async () => {
    let response = await axiosInstance.get('/games')
    return response.data
  },
  getById: async (id) => {
    if (!id) return

    let response = await axiosInstance.get(`/games/${id}`)
    return response.data
  },
  create: async (game) => {
    if (!game) return

    let response = await axiosInstance.post(`/games`, { game: game })
    return response.data
  },
  destroy: async (id) => {
    if (!id) return

    let response = await axiosInstance.delete(`/games/${id}`)
    return response.data
  },
  update: async(id, game) => {
    if (!id && !game) return

    let response = await axiosInstance.put(`/games/${id}`, { game: game })
    return response.data
  }
}

export default GameService