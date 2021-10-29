import { textToTime, timeToText, isFaster, addTime, subTime } from "./time";

export const textToChart = (
  text: string
): { titles: string[]; records: Time[][] } => {
  const [titleLine, ...recordLines] = text.split("\n");
  const titles = titleLine.split("\t");
  const records = recordLines.map((line) =>
    line.split("\t").map((text) => textToTime(text))
  );
  return { titles, records };
};

export const chartToText = (titles: string[], records: Time[][]): string => {
  const titleLine = titles.join("\t");
  const recordLines = records
    .map((line) => line.map((time) => timeToText(time)).join("\t"))
    .join("\n");
  return `${titleLine}\n${recordLines}`;
};

export const getBestRecord = (records: Time[][]): Time[] =>
  records.reduce(
    (acc, record) =>
      isFaster(acc.slice(-1)[0], record.slice(-1)[0]) ? acc : record,
    records[0]
  );

export const getPossibleBest = (records: Time[][]): Time[] => {
  const bestSegments = records.reduce((acc, record) => {
    const segment = record.map((time, index) =>
      index === 0 ? time : subTime(time, record[index - 1])[1]
    );
    return acc.map((time, index) =>
      isFaster(time, segment[index]) ? time : segment[index]
    );
  }, records[0]);
  bestSegments.forEach((time, index) => {
    if (index === 0) return;
    bestSegments[index] = addTime(time, bestSegments[index - 1]);
  });
  return bestSegments;
};
