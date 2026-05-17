import { create } from 'zustand'
import anecService from './services/anecdotes'

const useAnecdoteStore = create((set, get) => ({
  anecdotes: [],
  filter: '',
  actions: {
    initialize: async () => {
      const anecdotes = await anecService.getAll()
      set({ anecdotes })
    },
    vote: async (id) => {
      const anec = get().anecdotes.find((a) => a.id === id)

      const updatedAnec = { 
        ...anec, 
        votes: anec.votes + 1 
      }

      const savedAnec = await anecService.update(id, updatedAnec)

      set((state) => ({
      anecdotes: state.anecdotes.map((a) => a.id === id ? savedAnec : a)
    }))},
    
    create: async (content) => {
      const savedAnec = await anecService.create(content)

      set((state) => ({
      anecdotes: state.anecdotes.concat(savedAnec)
      }))},
    
    remove: async (id) => {
      await anecService.remove

      set((state) => ({
        anecdotes: state.anecdotes.filter((a) => a.id !== id)
      }))},

    setFilter: (filter) => set({ filter }),
  },
}))

export const useAnecdotes = () => {
  const anecdotes = useAnecdoteStore((state) => state.anecdotes)
  const filter = useAnecdoteStore((state) => state.filter)

  return anecdotes
    .filter(a => a.content.toLowerCase().includes(filter.toLowerCase()))
    .toSorted((a, b) => b.votes - a.votes)
}
  
export const useAnecdoteActions = () => useAnecdoteStore((state) => state.actions)
export const useFilter = () => useAnecdoteStore((state) => state.filter)

export default useAnecdoteStore
