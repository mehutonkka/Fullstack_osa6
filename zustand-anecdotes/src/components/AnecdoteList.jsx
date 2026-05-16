import { useAnecdotes, useAnecdoteActions, useFilter } from "../store"
import { useSetNotif } from "../notifStore"

const AnecdoteList = () => {
    const anecdotes = useAnecdotes()
    const { vote, remove } = useAnecdoteActions()
    const filter = useFilter()
    const setNotif = useSetNotif()

    const anecdotesSorted = anecdotes
        .filter(a => a.content.toLowerCase().includes(filter.toLowerCase()))
        .toSorted((a, b) => b.votes - a.votes)

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