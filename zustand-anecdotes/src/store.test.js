import { describe, it, expect, beforeEach, vi} from 'vitest'
import { renderHook, act } from '@testing-library/react'

vi.mock('./services/anecdotes', () => ({
    default: {
        getAll: vi.fn(),
        create: vi.fn(),
        update: vi.fn(),
        remove: vi.fn()
    }
}))

import anecService from './services/anecdotes'
import useAnecdoteStore, {useAnecdotes, useAnecdoteActions} from './store'

const initAnecs = [
    {
        id: '1',
        content: 'test anec 1',
        votes: '3',
    },
    {
        id: '2',
        content: 'test anec 2',
        votes: '1',
    },
    {
        id: '3',
        content: 'different anec',
        votes: '6',
    },
]

beforeEach(() => {
    useAnecdoteStore.setState({
        anecdotes: [],
        filter: '',
    })
    vi.clearAllMocks()
})

describe('anecdote store tests', () => {
    it('initializes anecdotes correctly', async () => {
        anecService.getAll.mockResolvedValue(initAnecs)

        const { result } = renderHook(() => useAnecdoteActions())
        await act(async () => {
            await result.current.initialize()
        })

        const { result: anecResult } = renderHook(() => useAnecdotes())

        expect(anecResult.current).toEqual(
            initAnecs.toSorted((a, b) => b.votes - a.votes
        ))
    })

    it('returns anecdotes sorted correctly', () => {
        useAnecdoteStore.setState({
            anecdotes: initAnecs,
            filter: '',
        })

        const { result } = renderHook(() => useAnecdotes())

        expect(result.current.map(a => a.content)).toEqual([
            'different anec',
            'test anec 1',
            'test anec 2',
        ])
    })

    it('returns filtered anecdotes correctly', () => {
        useAnecdoteStore.setState({
            anecdotes: initAnecs,
            filter: 'different',
        })

        const { result } = renderHook(() => useAnecdotes())
        
        expect(result.current).toEqual([
            {
                id: '3',
                content: 'different anec',
                votes: '6',
            },
        ])
    })

    it('voting an anecdote updates the votes', async () => {
        const votableAnec = {
            id: '4',
            content: 'votable anec',
            votes: '2',
        }

        const updatedAnec = {
            ...votableAnec,
            votes: '3',
        }

        useAnecdoteStore.setState({
            anecdotes: [votableAnec],
            filter: '',
        })

        anecService.update.mockResolvedValue(updatedAnec)

        const { result } = renderHook(() => useAnecdoteActions())

        await act(async () => {
            await result.current.vote('4')
        })

        const { result: anecResult } = renderHook(() => useAnecdotes())

        expect(anecResult.current[0].votes).toBe('3')
    })
})