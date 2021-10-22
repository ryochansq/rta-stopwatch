export const textToChart = (text: string): Step[] => {
  const textList = text.split("\n");
  const stepList = textList.map((line) => {
    const [title, time] = line.split(" ");
    return { title, time };
  });
  return stepList;
};

export const chartToText = (chart: Step[]): string => {
  const text = chart.reduce((acc, step, index) => {
    const currentLine = `${step.title} ${step.time}`;
    return index === 0 ? currentLine : `${acc}\n${currentLine}`;
  }, "");
  return text;
};
