import React, { VFC } from "react";
import { subTime, timeToText } from "../utils/time";

type Props = {
  prevTime: Time;
  newTime: Time;
};

export const Diff: VFC<Props> = ({ prevTime, newTime }) => {
  const [sign, sub] = subTime(newTime, prevTime);
  const color = sign === "-" ? "lightgreen" : "red";
  const text = timeToText(sub);
  const diffText = `${sign}${text}`;
  return <span style={{ color }}>{diffText}</span>;
};
