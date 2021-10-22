import React, { VFC, useState, useEffect } from "react";
import { chartToText, textToChart } from "../utils/chart";

type Props = {
  chart: Step[];
  setChart: React.Dispatch<React.SetStateAction<Step[]>>;
};

export const Edit: VFC<Props> = ({ chart, setChart }) => {
  const chartText = chartToText(chart);
  const [text, setText] = useState(chartText);

  useEffect(() => {
    return () => {
      const newChart = textToChart(text);
      setChart(newChart);
    };
  }, [text, setChart]);

  const placeholder = "Step1 00:01:23\nStep2 00:34:56\nStep3 01:22:33";
  return (
    <>
      <div>
        <textarea
          rows={20}
          placeholder={placeholder}
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </div>
    </>
  );
};
