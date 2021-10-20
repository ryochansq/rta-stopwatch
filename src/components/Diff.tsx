import React, { VFC } from "react";

const pad2 = (n: number) => n.toString().padStart(2, "0");
const formatDiff = (h: number, m: number, s: number) => {
  if (h === 0 && m === 0) return `0:${pad2(s)}`;
  else if (h === 0) return `${m}:${pad2(s)}`;
  else return `${pad2(h)}:${pad2(m)}:${pad2(s)}`;
};

type Props = {
  step: Step;
};

export const Diff: VFC<Props> = ({ step }) => {
  if (!step.lap) return <span>{step.time || "-"}</span>;
  if (!step.time) return <span>{step.lap}</span>;
  const diff =
    Date.parse(`1970-01-01T${step.lap}`) -
    Date.parse(`1970-01-01T${step.time}`);
  const diffAbs = Math.abs(diff);
  const diffDate = new Date(diffAbs);
  const sign = diff < 0 ? "-" : "+";
  const color = diff < 0 ? "lightgreen" : "red";
  const text = formatDiff(
    diffDate.getUTCHours(),
    diffDate.getUTCMinutes(),
    diffDate.getUTCSeconds()
  );
  const diffText = `${sign}${text}`;
  return <span style={{ color }}>{diffText}</span>;
};
