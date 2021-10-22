const pad2 = (n: number): string => n.toString().padStart(2, "0");

export const formatTime = (
  h: number,
  m: number,
  s: number,
  b: boolean
): string => {
  if (b) return `${pad2(h)}:${pad2(m)}:${pad2(s)}`;
  if (h === 0 && m === 0) return `0:${pad2(s)}`;
  else if (h === 0) return `${m}:${pad2(s)}`;
  else return `${h}:${pad2(m)}:${pad2(s)}`;
};

export const formatTimeDate = (date: Date): string =>
  formatTime(
    date.getUTCHours(),
    date.getUTCMinutes(),
    date.getUTCSeconds(),
    false
  );

export const formatTimeText = (timeText: string): string => {
  console.info(timeText);
  const date = new Date(`01 Jan 1970 ${timeText} GMT`);
  console.info(date);
  return formatTimeDate(date);
};
