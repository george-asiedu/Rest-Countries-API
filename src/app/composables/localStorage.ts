import { DestroyRef, effect, inject, signal } from "@angular/core"

export const useLocalStorage = (key: string, initialValue: string) => {
    const value = signal<string>(initialValue)

    const storedValue = localStorage.getItem(key)
    if(storedValue !== null) {
        value.set(storedValue)
    }

    function storageHandler(e: StorageEvent) {
        if(e.key === key) {
            const newValue = e.newValue !== null ? e.newValue : ''
            value.set(newValue)
        }
    }

    window.addEventListener('storage', storageHandler, true)

    effect(() => {
        localStorage.setItem(key, value())
    })

    inject(DestroyRef).onDestroy(() => {
        window.removeEventListener('storage', storageHandler)
    })

    return { value }
}