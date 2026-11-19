// 04 - moods

// TODO: the four moods
export type Mood = "sleepy" | "hungry" | "playful" | "grumpy";

// TODO: fed (grams), petted (seconds), ignored, vacuum
export type CatEvent = { kind: "fed"; grams: number} 
|{kind: "petted"; seconds:number}
|{kind: "ignored"}
|{kind: "vacuum"};

 

export function sound(mood: Mood): string {
  switch(mood) {
    case "sleepy": return "purr";
    case "hungry": return "MEOW";
    case "playful": return "chirp";
    case "grumpy": return "hiss";
    default: throw new Error(`Unknown mood: ${mood}`)
  }
}

export function next(mood: Mood, event: CatEvent): Mood {
switch(event.kind) {
  case "fed": 
          if (event.grams >= 50) return "sleepy"; 
           else return "hungry";
  case "petted": 
          if(mood === "grumpy") return "grumpy";
          if(event.seconds >3) return "grumpy";
           else return "playful";
  case "ignored": 
          if( mood === "playful") 
            return "grumpy";
          else return mood;
 
  case "vacuum": 
          return "grumpy";
  default: throw new Error(`Unknown event: ${event}`)
}
}

export function day(start: Mood, events: CatEvent[]): Mood[] {
  const moods: Mood[] = [];
  let current=start;
  for (const event of events) {
    current = next(current, event);
    moods.push(current);
  }
  return moods;
}

export function parseMood(input: unknown): Mood | null {
  if (typeof input !== "string") {
    return null;
  }
  const mood =input.trim().toLowerCase();
  if (mood === "sleepy" || mood === "hungry" || mood === "playful" || mood === "grumpy") {
    return mood;
  }
  return null;
}
