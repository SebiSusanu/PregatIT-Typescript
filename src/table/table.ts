// 03 - knock it off the table

// TODO: name, fragile, and an optional owner
export type Item = {
  name: string;
  fragile:boolean;
  owner?: string;
};

// TODO: name and items
export type Table = {
  name: string;
  items: Item[];
};

export function knockOff(table: Table, name: string): Table {
  return{
    name: table.name,
    items: table.items.filter((item) => item.name !== name)
  }
}

export function knockAllOff(table: Table): Table[] {
   const current = [...table.items];
  const snapshots: Table[] = [];
  while (current.length > 0) {
    current.pop();
    snapshots.push({ name: table.name, items: [...current] });
  }
  return snapshots;
  }
  
export function rename(table: Table, from: string, to: string): Table {
  return {
    ...table,
    items: table.items.map(item => item.name === from ? { ...item, name: to } : item)
  };
}

export function broken(before: Table, after: Table): string[] {
 const afterNames = after.items.map(item => item.name);
  return before.items
    .filter(item => item.fragile && !afterNames.includes(item.name))
    .map(item => item.name);
}

export function whose(item: Item): string {
  return `${item.owner ?? "nobody"}'s ${item.name}`;
};