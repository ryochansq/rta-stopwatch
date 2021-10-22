import React, { VFC, useState } from "react";
import { chartToText, textToChart } from "../utils/chart";

type Props = {
  chart: Step[];
  setChart: React.Dispatch<React.SetStateAction<Step[]>>;
};

export const Edit: VFC<Props> = ({ chart, setChart }) => {
  const chartText = chartToText(chart);
  const [text, setText] = useState(chartText);

  const handleSave = () => {
    const newChart = textToChart(text);
    setChart(newChart);
  };
  return (
    <>
      <div>
        <textarea
          rows={20}
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </div>
      <button onClick={handleSave}>Save</button>
    </>
  );
};
