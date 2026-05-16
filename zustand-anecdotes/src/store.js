import { create } from 'zustand'

const baseUrl = 'http://localhost:3001/anecdotes'


const useAnecdoteStore = create((set) => ({
  anecdotes: [],
  filter: '',
  actions: {
    initialize: async () => {
      const response = await fetch(baseUrl)
      const anecdotes = await response.json()
      set({ anecdotes })
    },
    vote: async (id) => {
      const response = await fetch(`${baseUrl}/${id}`)
      const anec = await response.json()

      const updatedAnec = { 
        ...anec, 
        votes: anec.votes + 1 
      }

      const updateResponse = await fetch(`${baseUrl}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedAnec)
      })

      const savedAnec = await updateResponse.json()

      set((state) => ({
      anecdotes: state.anecdotes.map((a) => a.id === id ? savedAnec : a)
    }))},
    
    create: async (content) => {
      const newAnec = {
        content,
        votes: 0,
      }

      const response = await fetch(baseUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newAnec)
      })
      
      const savedAnec = await response.json()

      set((state) => ({
      anecdotes: state.anecdotes.concat(savedAnec)
      }))},
    
    remove: async (id) => {
      await fetch(`${baseUrl}/${id}`, {
        method: 'DELETE',
      })

      set((state) => ({
        anecdotes: state.anecdotes.filter((a) => a.id !== id)
      }))},

    setFilter: (filter) => set({ filter }),
  },
}))

export const useAnecdotes = () => useAnecdoteStore((state) => state.anecdotes)
export const useAnecdoteActions = () => useAnecdoteStore((state) => state.actions)
export const useFilter = () => useAnecdoteStore((state) => state.filter)
