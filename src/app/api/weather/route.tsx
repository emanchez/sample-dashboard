import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  console.log('Weather API called') // Verify it's being hit
  
  const { searchParams } = new URL(request.url)
  const lat = searchParams.get('lat')
  const lng = searchParams.get('lng')

  if (!lat || !lng) {
    return NextResponse.json(
      { error: 'Missing location parameters' },
      { status: 400 }
    )
  }

  try {
    const API_KEY = process.env.GOOGLE_MAPS_APIKEY
    if (!API_KEY) {
      throw new Error('API key not configured')
    }

    const apiUrl = `https://weather.googleapis.com/v1/currentConditions:lookup?key=${API_KEY}&location.latitude=${lat}&location.longitude=${lng}&unitsSystem=IMPERIAL`
    console.log('Calling Google Weather API:', apiUrl) // Debugging

    const response = await fetch(apiUrl)

    console.log('API response status:', response.status) // Debugging
    
    if (!response.ok) {
      const errorData = await response.text()
      console.error('API error response:', errorData)
      throw new Error(`API request failed with status ${response.status}`)
    }

    const data = await response.json()
    //console.log('API success response:', data) // Debugging
    return NextResponse.json(data)
    
  } catch (error) {
    console.error('Full API error:', error)
    return NextResponse.json(
      { 
        error: 'Failed to fetch weather data',
        details: error instanceof Error ? error.message : String(error)
      },
      { status: 500 }
    )
  }
}