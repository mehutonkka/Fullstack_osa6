import { useAnecdotes, useAnecdoteActions } from "../store"
import { useSetNotif } from "../notifStore"

const AnecdoteList = () => {
    const anecdotesSorted = useAnecdotes()
    const { vote, remove } = useAnecdoteActions()
    const setNotif = useSetNotif()

    const voteHandler = async (anecdote) => {
        await vote(anecdote.id)
        setNotif(`you voted for '${anecdote.content}'`, 5)
    }

    const deleteHandler = async (anecdote) => {
        await remove(anecdote.id)
    }

    return (
        <div>
            {anecdotesSorted.map(anecdote => (
                <div key={anecdote.id}>
                    <div>
                        {anecdote.content}
                    </div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => voteHandler(anecdote)}>vote</button>
                        {anecdote.votes === 0 && (
                            <button onClick={() => deleteHandler(anecdote)}>delete</button>
                        )}
                    </div>
                </div>
            ))}
        </div>
    )}


export default AnecdoteList