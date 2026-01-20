export type MemoryData = {
  date: string;
  intention?: string;
  practical?: string[];
  reflection?: string;
};

const STORAGE_PREFIX = "dont-forget:daily";
const TODAY_KEY = `${STORAGE_PREFIX}:today`;
const YESTERDAY_KEY = `${STORAGE_PREFIX}:yesterday`;

function read(key: string): MemoryData | null {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return null;
    return JSON.parse(raw) as MemoryData;
  } catch {
    return null;
  }
}

function write(key: string, value: MemoryData): void {
  localStorage.setItem(key, JSON.stringify(value));
}

export function getToday(): MemoryData | null {
  return read(TODAY_KEY);
}

export function setToday(data: MemoryData): void {
  const existingToday = read(TODAY_KEY);
  if (existingToday && existingToday.date !== data.date) {
    write(YESTERDAY_KEY, existingToday);
  }

  write(TODAY_KEY, data);
}

export function getYesterday(): MemoryData | null {
  return read(YESTERDAY_KEY);
}

export function clearToday(): void {
  localStorage.removeItem(TODAY_KEY);
}
