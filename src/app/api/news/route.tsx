import { NextResponse } from "next/server"

export async function GET(request: Request) {
    console.log('SerPapi API called') // Verify it's being hit
    
    const { searchParams } = new URL(request.url) // not really needed since theres nothing to add to query

    try {
        const API_KEY = process.env.SERPAPI_API_KEY
        if (!API_KEY) {
            throw new Error('API key not configured')
        }

        const apiUrl = `https://serpapi.com/search?engine=google_news&gl=us&hl=en&api_key=${API_KEY}`
        console.log('Calling SerPapi API:', apiUrl) // Debugging

        const response = await fetch(apiUrl)
    
        if (!response.ok) {
            const errorData = await response.text()
            console.error('API error response:', errorData)
            throw new Error(`API request failed with status ${response.status}`)
        }


        const data = await response.json()
        console.log('API success response:', data) // Debugging
        return NextResponse.json(data)
        
    } catch (error) {
        console.error('Full API error:', error)
        return NextResponse.json(
            { 
                error: 'Failed to fetch seripapi data',
                details: error instanceof Error ? error.message : String(error)
            },
            { status: 500 }
        )
    }

    
}