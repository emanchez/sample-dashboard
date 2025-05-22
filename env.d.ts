declare namespace NodeJS {
  export interface ProcessEnv {
    // 👇 Replace with your ENV names and types
    MY_NAME:string,
    GOOGLE_MAPS_APIKEY:string,
    SERPAPI_API_KEY:string,
    SAMPLE_LAT:number,
    SAMPLE_LONG:number
  }
}