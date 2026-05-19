import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

import { getAllAnecdotes, updateAnecdote, createAnecdote } from "../requests"

export const useAnecdotes = () => {
    return useQuery({
        queryKey: ['anecdotes'],
        queryFn: getAllAnecdotes,
        retry: 1,
    })
}

export const useCreateAnecdote = (options = {}) => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: createAnecdote,
        onSuccess: (newAnecdote) => {
            const anecdotes = queryClient.getQueryData(['anecdotes'])
            queryClient.setQueryData(['anecdotes'], anecdotes.concat(newAnecdote))

            if (options.onSuccess) {
                options.onSuccess(newAnecdote)
            }
        },
        onError: () => {
            if (options.onError) {
                options.onError()
            }
        }
    })
}

export const useUpdateAnecdote = (options = {}) => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: updateAnecdote,
        onSuccess: (updatedAnecdote) => {
            const anecdotes = queryClient.getQueryData(['anecdotes'])

            queryClient.setQueryData(
                ['anecdotes'],
                anecdotes.map(anecdote =>
                anecdote.id !== updatedAnecdote.id ? anecdote : updatedAnecdote
                )
            )

            if (options.onSuccess) {
                options.onSuccess(updatedAnecdote)
            }
        }
    })
}


  