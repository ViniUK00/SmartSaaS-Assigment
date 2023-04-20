export interface Weather {
    lat : number,
    lon: number,
    timezone: string,
    timezone_offset: number,
    current: {
      dt: number,
      temp: number,
      feels_like: number,
      humidity: any,
      uvi: number,
      wind_speed: string,
      pressure: string
      weather: [
        {
          main: string,
          description: string,
          icon: string
        }
      ]
    }
  }