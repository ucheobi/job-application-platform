"use client"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactNode, useState } from "react"

interface QueryProvidersProps {
    children: ReactNode
}

export default function QueryProvider({ children }: QueryProvidersProps) {
    const [ queryClient ] = useState(() => new QueryClient())

    return (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    )
}