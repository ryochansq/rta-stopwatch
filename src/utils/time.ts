const pad2 = (n: number): string => n.toString().padStart(2, "0");

export const timeToSeconds = (time: Time): number =>
  time.hours * 3600 + time.minutes * 60 + time.seconds;

export const secondsToTime = (seconds: number): Time => {
  return {
    hours: Math.floor(seconds / 3600),
    minutes: Math.floor((seconds % 3600) / 60),
    seconds: seconds % 60,
  };
};

export const addTime = (t1: Time, t2: Time): Time => {
  const s1 = timeToSeconds(t1);
  const s2 = timeToSeconds(t2);
  return secondsToTime(s1 + s2);
};

export const subTime = (t1: Time, t2: Time): [string, Time] => {
  const s1 = timeToSeconds(t1);
  const s2 = timeToSeconds(t2);
  const sign = s1 - s2 < 0 ? "-" : "+";
  const time = secondsToTime(Math.abs(s1 - s2));
  return [sign, time];
};

export const isFaster = (t1: Time, t2: Time): boolean => {
  const s1 = timeToSeconds(t1);
  const s2 = timeToSeconds(t2);
  return s1 < s2;
};

export const timeToText = (time: Time): string => {
  const { hours: h, minutes: m, seconds: s } = time;
  if (h === 0 && m === 0) return `0:${pad2(s)}`;
  else if (h === 0) return `${m}:${pad2(s)}`;
  else return `${h}:${pad2(m)}:${pad2(s)}`;
};

export const secondsToText = (seconds: number): string => {
  const time = secondsToTime(seconds);
  return timeToText(time);
};

export const textToTime = (text: string): Time => {
  const parsed = text.split(":").reverse();
  const converted = parsed.map((item) => parseInt(item));
  return {
    hours: converted.length > 2 ? converted[2] : 0,
    minutes: converted[1],
    seconds: converted[0],
  };
};
