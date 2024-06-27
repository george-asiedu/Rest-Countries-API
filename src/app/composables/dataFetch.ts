import { Signal, signal, effect } from "@angular/core";

export const useFetch = <D>(url: Signal<string>) => {
    const data = signal<D | null>(null)
    const error = signal<Error | null>(null)

    const doFetch = async () => {
        const urlValue = url()

        try {
            await new Promise(resolve => setTimeout(resolve, 1000))

            const res = await fetch(urlValue)
            const result = await res.json()

            data.set(result)
            error.set(null)
        } catch (e) {
            data.set(null)
            error.set(e as Error)
        }
    };

    effect(() => {
        doFetch()
    })

    return { data, error, retry: doFetch }
}