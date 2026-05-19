import { useCreateAnecdote } from "../hooks/useAnecdotes"
import { useNotify } from "../NotificationContext"


const AnecdoteForm = () => {
  const setNotif = useNotify()

  const createAnecdoteMutation = useCreateAnecdote({
    onSuccess: (newAnecdote) => {
      setNotif(`anecdote '${newAnecdote.content}' created`)
    },
    onError: () => {
      setNotif('too short anecdote, must be 5 characters or more')
    }
  })
  
  const onCreate = (event) => {
    event.preventDefault()

    const content = event.target.anecdote.value
    event.target.reset()

    createAnecdoteMutation.mutate(content)
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm