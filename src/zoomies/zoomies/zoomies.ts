// 02 - zoomies

export type Position = [number, number]; // [x, y]
export type Dir = "N" | "E" | "S" | "W";

export const ROOM = 10; // 10x10, coordinates 0..9

// TODO: type the parameters and the return values. tsc complains until you do.

export function move( pos: Position, dir: Dir, steps = 1): Position {
  let [x, y] = pos;
  switch (dir) {
    case "N":
      y=Math.min(y+steps, 9);
      break;
    case "S":
      y=Math.max(y-steps, 0);
      break;
    case "E":
      x=Math.min(x+steps, 9);
      break;
    case "W":
      x=Math.max(x-steps, 0);
      break;
  } 
  return [x, y];
}

export function run(start: Position, dirs: Dir[]): Position[] {
  const positions: Position[] = [start];
  let currentPos : Position = [...start];
  for (const dir of dirs){
    currentPos = move(currentPos, dir);
    positions.push([...currentPos]);
  }
  return positions;
}

export function distance( a: Position, b: Position): number {
  const [x1, y1] = a;
  const [x2, y2] = b;
  return Math.abs(x1 - x2) + Math.abs(y1 - y2);
  
}

export function farthest(start: Position, dirs:Dir[]): Position  {
  const positions = run(start, dirs);
  let farthestPos : Position = positions[0] ?? start;
  let maxDistance = 0;
  for (const pos of positions) {
    const dist = distance(start, pos);
    if (dist > maxDistance) {
      maxDistance = dist;
      farthestPos = pos;
    }
  }
  return farthestPos;
}

export function where(pos:Position, name:string) {
const [x, y] = pos;
return `${name} is at (${x}, ${y})`;
  
}
