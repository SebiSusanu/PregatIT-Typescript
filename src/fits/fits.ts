// If I fits, I sits
// Tests: node --test        Types: npx tsc --noEmit

/** Dimensions in cm. `label?` means the field may be absent entirely. */
export type Box = {
  readonly width: number;
  readonly depth: number;
  readonly label?: string;
};

export type Cat = {
  readonly name: string;
  /** nose to tail base, cm */
  readonly length: number;
  readonly width: number;
};

/** The result of seating one cat. `box: null` means the cat found nothing. */
export type Seating = {
  readonly cat: Cat;
  readonly box: Box | null;
};

// export function fits(cat: Cat, box: Box): boolean {
//   throw new Error("fits: not written yet");
// }

/**
 * Cats are liquid: the box area must be at least 70% of the cat's area,
 * and the box's shorter side at least half the cat's width.
 */
export function fits(cat: Cat, box: Box): boolean {
  const catArea = cat.length * cat.width;
  const boxArea = box.width * box.depth;
  const minSide = Math.min(box.width, box.depth);

  return box.width > 0 && box.depth > 0 && boxArea >= catArea * 0.7 && minSide >= cat.width / 2;
}

// export function bestBox(cat: Cat, boxes: readonly Box[]): Box | null {
//   throw new Error("bestBox: not written yet");
// }

/** The smallest box (by area) the cat fits in; the first one on a tie; null if none. */
export function bestBox(cat: Cat, boxes: readonly Box[]): Box | null {
  let best: Box | null = null;

  for (const box of boxes) {
    if (!fits(cat, box)) {
      continue;
    }

    if (best === null || box.width * box.depth < best.width * best.depth) {
      best = box;
    }
  }

  return best;
}

// export function seat(cats: readonly Cat[], boxes: readonly Box[]): Seating[] {
//   throw new Error("seat: not written yet");
// }

/**
 * Each cat, in order, takes its best box among those still free.
 * `boxes` must come out exactly as it went in.
 */
export function seat(cats: readonly Cat[], boxes: readonly Box[]): Seating[] {
  const remaining = [...boxes];
  const result: Seating[] = [];

  for (const cat of cats) {
    const chosen = bestBox(cat, remaining);

    if (chosen === null) {
      result.push({ cat, box: null });
      continue;
    }

    const index = remaining.findIndex((box) => box === chosen);
    if (index !== -1) {
      remaining.splice(index, 1);
    }

    result.push({ cat, box: chosen });
  }

  return result;
}

// export function describe(box: Box): string {
//   throw new Error("describe: not written yet");
// }

/** "shoebox (30×20)" or "unlabelled box (30×20)". The × is U+00D7. */
export function describe(box: Box): string {
  const label = box.label ?? "unlabelled box";
  return `${label} (${box.width}×${box.depth})`;
}
