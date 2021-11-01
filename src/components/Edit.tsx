import React, { VFC, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from '../store';
import { setChart } from '../store/timerSlice';
import { chartToText, textToChart } from '../utils/chart';

export const Edit: VFC = () => {
  const titles = useSelector((state) => state.timer.titles);
  const records = useSelector((state) => state.timer.records);
  const chartText = chartToText(titles, records);
  const [text, setText] = useState(chartText);
  const dispatch = useDispatch();

  const handleSave = (): boolean => {
    const newChart = textToChart(text);
    // 全てのrecordの長さがtitlesの長さと一致しているかチェック
    const ok = newChart.records.reduce(
      (acc, record) => acc && record.length === newChart.titles.length,
      true
    );
    if (ok) dispatch(setChart(newChart));
    else alert('Text is invalid.');
    return ok;
  };

  return (
    <>
      <div>
        <textarea rows={20} value={text} onChange={(e) => setText(e.target.value)} />
      </div>
      <div>
        <button onClick={handleSave}>Save</button>
      </div>
    </>
  );
};
