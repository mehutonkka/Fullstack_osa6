/* eslint-disable react-refresh/only-export-components */

import { createContext, useContext, useReducer } from "react"

const notificationReducer = (state, action) => {
    switch (action.type) {
        case 'SET':
            return action.payload
        case 'CLEAR':
            return null
        default:
            return state
    }
}

const NotificationContext = createContext()

export const NotificationContextProvider = (props) => {
    const [notification, notificationDispatch] = useReducer(notificationReducer, null)

    return (
        <NotificationContext.Provider value={[notification, notificationDispatch]}>
            {props.children}
        </NotificationContext.Provider>
     )
}

export const useNotificationValue = () => {
    const notifAndDispatch = useContext(NotificationContext)
    return notifAndDispatch[0]
}

export const useNotificationDispatch = () => {
    const notifAndDispatch = useContext(NotificationContext)
    return notifAndDispatch[1]
}

export const useNotify = () => {
    const dispatch = useNotificationDispatch()

    const notify = (message, seconds = 5) => {
        dispatch({ type: 'SET', payload: message })

        setTimeout(() => {
            dispatch({ type: 'CLEAR' })
        }, seconds * 1000)
    }

    return notify
}

export default NotificationContext
