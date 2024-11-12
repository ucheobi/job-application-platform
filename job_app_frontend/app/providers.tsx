"use client"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { ReactNode, useState } from "react"

interface QueryProvidersProps {
    children: ReactNode
}

export default function QueryProvider({ children }: QueryProvidersProps) {
    const [ queryClient ] = useState(() => new QueryClient())

    return (
        <QueryClientProvider client={queryClient}>
            <ReactQueryDevtools />
            {children}
        </QueryClientProvider>
    )
}