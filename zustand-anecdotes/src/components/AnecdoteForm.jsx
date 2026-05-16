import { useAnecdoteActions } from "../store"
import { useSetNotif } from "../notifStore"

const AnecdoteForm = () => {
    const { create } = useAnecdoteActions()
    const setNotif = useSetNotif()

    const addAnecdote = (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value

        if (content.trim() === '') {
            return
        }

        create(content)

        event.target.anecdote.value = ''
        setNotif(`you created '${content}'`, 5)
    }

    return (
        <div>
            <h2>create new</h2>
            <form onSubmit={addAnecdote}>
                <div>
                    <input name="anecdote" />
                </div>
                <button type="submit">create</button>
            </form>
        </div>
    )
}

export default AnecdoteForm
