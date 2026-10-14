// Secret commands and utility handlers for Terminal Console

export interface CommandResult {
  text: string;
  type: 'output' | 'success' | 'system' | 'error' | 'warning';
}

// Secret commands list view
export const getSecretsMenu = (): CommandResult[] => [
  { text: "Secret Commands:", type: "system" },
  { text: "  weather       Live weather details", type: "output" },
  { text: "  joke          Random programming joke", type: "output" },
  { text: "  advice        Random life advice", type: "output" },
  { text: "  cat           Random cat fact", type: "output" },
  { text: "  space         NASA astronomy picture of the day", type: "output" },
  { text: "  ip            Public IP address", type: "output" },
  { text: "  qr <text>     Generate QR code", type: "output" },
  { text: "  who           Show user session identity", type: "output" }
];

// IP command
export const fetchPublicIP = async (): Promise<CommandResult[]> => {
  try {
    const res = await fetch('https://api.ipify.org?format=json');
    if (res.ok) {
      const data = await res.json();
      return [
        { text: `Public IP : ${data.ip}`, type: "output" },
        { text: "Warning   : That's you. Be careful out there.", type: "warning" }
      ];
    }
  } catch {
    try {
      const res = await fetch('https://api.ipapi.is');
      if (res.ok) {
        const data = await res.json();
        return [
          { text: `Public IP : ${data.ip}`, type: "output" },
          { text: "Warning   : That's you. Be careful out there.", type: "warning" }
        ];
      }
    } catch {
      // Fallback
    }
  }

  return [
    { text: "Public IP : 127.0.0.1", type: "output" },
    { text: "Warning   : That's you. Be careful out there.", type: "warning" }
  ];
};

const fetchWithTimeout = async (url: string, options: RequestInit = {}, timeoutMs = 4000): Promise<Response> => {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetch(url, { ...options, signal: controller.signal });
    clearTimeout(timer);
    return res;
  } catch (err) {
    clearTimeout(timer);
    throw err;
  }
};

const WEATHER_DESCRIPTIONS: Record<number, string> = {
  0: "Clear sky",
  1: "Mainly clear",
  2: "Partly cloudy",
  3: "Overcast",
  45: "Foggy",
  48: "Depositing rime fog",
  51: "Light drizzle",
  53: "Moderate drizzle",
  55: "Dense drizzle",
  61: "Slight rain",
  63: "Moderate rain",
  65: "Heavy rain",
  71: "Slight snow",
  73: "Moderate snow",
  75: "Heavy snow",
  80: "Slight rain showers",
  81: "Moderate rain showers",
  82: "Violent rain showers",
  95: "Thunderstorm",
  96: "Thunderstorm with hail",
  99: "Thunderstorm with heavy hail"
};

const resolveIndianPincode = async (pincode: string): Promise<{ name: string } | null> => {
  try {
    const res = await fetchWithTimeout(`https://api.postalpincode.in/pincode/${pincode}`, {}, 3500);
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data) && data[0]?.Status === 'Success' && data[0]?.PostOffice?.length > 0) {
        const po = data[0].PostOffice[0];
        const locationName = `${po.District || po.Name}, ${po.State}, India`;
        return { name: locationName };
      }
    }
  } catch {
    // Ignore
  }
  return null;
};

const geocodeLocation = async (query: string): Promise<{ name: string; lat: number; lon: number; country?: string } | null> => {
  try {
    const res = await fetchWithTimeout(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(query)}&count=1&language=en&format=json`, {}, 3500);
    if (res.ok) {
      const data = await res.json();
      if (data?.results?.length > 0) {
        const item = data.results[0];
        return {
          name: item.name,
          lat: item.latitude,
          lon: item.longitude,
          country: item.country
        };
      }
    }
  } catch {
    // Ignore
  }
  return null;
};

const fetchOpenMeteoWeather = async (lat: number, lon: number, displayName: string): Promise<CommandResult[] | null> => {
  try {
    const res = await fetchWithTimeout(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`, {}, 3500);
    if (res.ok) {
      const data = await res.json();
      const current = data?.current_weather;
      if (current) {
        const desc = WEATHER_DESCRIPTIONS[current.weathercode] || "Clear";
        const tempC = Math.round(current.temperature);
        const tempF = Math.round((tempC * 9) / 5 + 32);
        const wind = Math.round(current.windspeed);

        return [
          { text: `Location     : ${displayName}`, type: "system" },
          { text: `Condition    : ${desc}`, type: "output" },
          { text: `Temperature  : ${tempC}°C / ${tempF}°F`, type: "output" },
          { text: `Wind Speed   : ${wind} km/h`, type: "output" }
        ];
      }
    }
  } catch {
    // Ignore
  }
  return null;
};

const getBrowserLocation = (): Promise<{ status: 'granted' | 'denied' | 'unavailable'; lat?: number; lon?: number }> => {
  return new Promise((resolve) => {
    if (typeof window === 'undefined' || !navigator?.geolocation) {
      resolve({ status: 'unavailable' });
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => resolve({ status: 'granted', lat: pos.coords.latitude, lon: pos.coords.longitude }),
      (err) => {
        if (err.code === err.PERMISSION_DENIED) {
          resolve({ status: 'denied' });
        } else {
          resolve({ status: 'unavailable' });
        }
      },
      { enableHighAccuracy: false, timeout: 5000, maximumAge: 300000 }
    );
  });
};

// Weather command
export const fetchWeather = async (target?: string): Promise<CommandResult[]> => {
  const query = target?.trim() || '';

  let lat: number | undefined;
  let lon: number | undefined;
  let displayName = '';

  if (query) {
    const isPincode = /^\d{6}$/.test(query);
    if (isPincode) {
      const pinDetails = await resolveIndianPincode(query);
      if (pinDetails) {
        displayName = `PIN ${query} (${pinDetails.name})`;
        const geo = await geocodeLocation(pinDetails.name.split(',')[0]);
        if (geo) {
          lat = geo.lat;
          lon = geo.lon;
        }
      }
    }

    if (!lat || !lon) {
      const geo = await geocodeLocation(query);
      if (geo) {
        lat = geo.lat;
        lon = geo.lon;
        displayName = `${geo.name}${geo.country ? `, ${geo.country}` : ''}`;
      } else {
        displayName = query;
      }
    }
  } else {
    const locResult = await getBrowserLocation();
    if (locResult.status === 'granted' && locResult.lat !== undefined && locResult.lon !== undefined) {
      lat = locResult.lat;
      lon = locResult.lon;
      displayName = 'Your Location';
    } else {
      try {
        const ipRes = await fetchWithTimeout('https://ipapi.co/json/', {}, 3000);
        if (ipRes.ok) {
          const ipData = await ipRes.json();
          if (ipData.latitude && ipData.longitude) {
            lat = ipData.latitude;
            lon = ipData.longitude;
            displayName = `${ipData.city || ipData.postal || 'Local Area'}, ${ipData.country_name || 'India'}`;
          }
        }
      } catch {
        // Ignore
      }
    }
  }

  if (lat !== undefined && lon !== undefined) {
    const weatherResult = await fetchOpenMeteoWeather(lat, lon, displayName || query);
    if (weatherResult) return weatherResult;
  }

  const finalLocation = displayName || query || 'Tirunelveli';
  try {
    const res = await fetchWithTimeout(`https://wttr.in/${encodeURIComponent(finalLocation)}?format=j1`, {}, 3000);
    if (res.ok) {
      const data = await res.json();
      const condition = data?.current_condition?.[0];
      const area = data?.nearest_area?.[0];

      if (condition) {
        const desc = condition.weatherDesc?.[0]?.value || 'Clear';
        const tempC = condition.temp_C || '30';
        const tempF = condition.temp_F || '86';
        const wind = condition.windspeedKmph || '12';
        const cityName = area?.areaName?.[0]?.value || finalLocation;

        return [
          { text: `Location     : ${cityName}`, type: "system" },
          { text: `Condition    : ${desc}`, type: "output" },
          { text: `Temperature  : ${tempC}°C / ${tempF}°F`, type: "output" },
          { text: `Wind Speed   : ${wind} km/h`, type: "output" }
        ];
      }
    }
  } catch {
    // Ignore
  }

  return [
    { text: `Location     : ${finalLocation}`, type: "system" },
    { text: "Condition    : Partly Cloudy", type: "output" },
    { text: "Temperature  : 31°C / 87.8°F", type: "output" },
    { text: "Wind Speed   : 14 km/h", type: "output" }
  ];
};

// Joke command
const PROGRAMMING_JOKES = [
  { setup: "Why do programmers prefer dark mode?", punchline: "Because light attracts bugs!" },
  { setup: "There are 10 types of people in the world:", punchline: "Those who understand binary, and those who don't." },
  { setup: "A SQL query walks into a bar, walks up to two tables and asks...", punchline: "'Can I join you?'" },
  { setup: "Why did the developer quit his job?", punchline: "Because he didn't get arrays!" },
  { setup: "How many programmers does it take to change a lightbulb?", punchline: "None. It's a hardware problem." },
  { setup: "What's the object-oriented way to become wealthy?", punchline: "Inheritance." },
  { setup: "Why do Java developers wear glasses?", punchline: "Because they don't C#!" }
];

export const fetchJoke = async (): Promise<CommandResult[]> => {
  try {
    const res = await fetch('https://official-joke-api.appspot.com/jokes/programming/random');
    if (res.ok) {
      const data = await res.json();
      const joke = Array.isArray(data) ? data[0] : data;
      if (joke && joke.setup && joke.punchline) {
        return [
          { text: joke.setup, type: "output" },
          { text: joke.punchline, type: "success" }
        ];
      }
    }
  } catch {
    // fallback
  }
  const fallback = PROGRAMMING_JOKES[Math.floor(Math.random() * PROGRAMMING_JOKES.length)];
  return [
    { text: fallback.setup, type: "output" },
    { text: fallback.punchline, type: "success" }
  ];
};

// Advice command
const LIFE_ADVICE = [
  "Fix the cause, not the symptom.",
  "Code is like humor. When you have to explain it, it’s bad.",
  "Premature optimization is the root of all evil.",
  "Simplicity is prerequisite for reliability.",
  "Make it work, make it right, make it fast.",
  "First, solve the problem. Then, write the code.",
  "Experience is the name everyone gives to their mistakes."
];

export const fetchAdvice = async (): Promise<CommandResult[]> => {
  try {
    const res = await fetch('https://api.adviceslip.com/advice');
    if (res.ok) {
      const data = await res.json();
      if (data?.slip?.advice) {
        return [
          { text: `"${data.slip.advice}"`, type: "output" }
        ];
      }
    }
  } catch {
    // fallback
  }
  const fallback = LIFE_ADVICE[Math.floor(Math.random() * LIFE_ADVICE.length)];
  return [
    { text: `"${fallback}"`, type: "output" }
  ];
};

// Cat command
const CAT_FACTS = [
  "Cats spend 70% of their lives sleeping.",
  "A group of cats is called a clowder.",
  "Cats have over 20 muscles that control their ears.",
  "A cat's brain is 90% similar to a human's brain.",
  "Cats have 230 bones, while humans only have 206.",
  "A cat's purr vibrates at a frequency between 25 and 150 Hertz, which improves bone density!"
];

export const fetchCatFact = async (): Promise<CommandResult[]> => {
  try {
    const res = await fetch('https://catfact.ninja/fact');
    if (res.ok) {
      const data = await res.json();
      if (data?.fact) {
        return [
          { text: data.fact, type: "output" }
        ];
      }
    }
  } catch {
    // fallback
  }
  const fallback = CAT_FACTS[Math.floor(Math.random() * CAT_FACTS.length)];
  return [
    { text: fallback, type: "output" }
  ];
};

// Space command
export const fetchSpaceInfo = async (): Promise<CommandResult[]> => {
  try {
    const res = await fetch('https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY');
    if (res.ok) {
      const data = await res.json();
      return [
        { text: "NASA Astronomy Picture of the Day:", type: "system" },
        { text: `  Title : ${data.title}`, type: "output" },
        { text: `  Date  : ${data.date}`, type: "output" },
        { text: `  URL   : ${data.hdurl || data.url}`, type: "output" }
      ];
    }
  } catch {
    // fallback
  }
  return [
    { text: "NASA Astronomy Picture of the Day:", type: "system" },
    { text: "  Title : Cosmic Pillars of Creation", type: "output" },
    { text: "  URL   : https://apod.nasa.gov/apod/astropix.html", type: "output" }
  ];
};

// QR command
export const generateQR = (text: string): CommandResult[] => {
  const targetText = text.trim() || "https://frozenn.in";
  const encoded = encodeURIComponent(targetText);
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encoded}`;
  return [
    { text: `QR Code generated for: "${targetText}"`, type: "system" },
    { text: `[IMG]${qrUrl}[/IMG]`, type: "output" }
  ];
};

// Who / Whoami Command
export const getWhoInfo = (): CommandResult[] => [
  { text: "User     : visitor@frozenn.in", type: "output" },
  { text: "Role     : Portfolio Explorer", type: "output" },
  { text: "Terminal : v2.4 Interactive Shell", type: "output" },
  { text: "Access   : Guest Level", type: "output" }
];
