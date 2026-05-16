import { create } from "zustand"

const useNotifStore = create((set) => ({
    notif: null,
    timeoutId: null,

    setNotif: (message, seconds = 5) => {
        set((state) => {
            if (state.timeoutId) {
                clearTimeout(state.timeoutId)
            }

            const timeoutId = setTimeout(() => {
                set({ notif: null, timeoutId: null })
            }, seconds * 1000)

            return {
                notif: message,
                timeoutId,
            }
        })
    },
}))

export const useNotif = () =>
  useNotifStore((state) => state.notif)

export const useSetNotif = () =>
  useNotifStore((state) => state.setNotif)
    
