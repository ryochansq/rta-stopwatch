import React, { VFC } from "react";
import { formatTimeDate, formatTimeText } from "../utils/time";

type Props = {
  step: Step;
};

export const Diff: VFC<Props> = ({ step }) => {
  if (!step.lap) return <span>{formatTimeText(step.time) || "-"}</span>;
  if (!step.time) return <span>{formatTimeText(step.lap)}</span>;
  const diff =
    Date.parse(`1970-01-01T${step.lap}`) -
    Date.parse(`1970-01-01T${step.time}`);
  const diffAbs = Math.abs(diff);
  const diffDate = new Date(diffAbs);
  const sign = diff < 0 ? "-" : "+";
  const color = diff < 0 ? "lightgreen" : "red";
  const text = formatTimeDate(diffDate);
  const diffText = `${sign}${text}`;
  return <span style={{ color }}>{diffText}</span>;
};
