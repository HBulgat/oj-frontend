// 判题消息枚举类型
export const QuestionSubmitJudgeStatusEnum = {
  RIGHT_OUTPUT: {
    value: "Right output",
    color: "green",
  },
  RUNNING: {
    value: "Running",
    color: "purple",
  },
  ACCEPTED: {
    value: "Accepted",
    color: "green",
  },
  WRONG_ANSWER: {
    value: "Wrong Answer",
    color: "red",
  },
  COMPILE_ERROR: {
    value: "Compile Error",
    color: "red",
  },
  MEMORY_LIMIT_EXCEEDED: {
    value: "Memory Limit Exceeded",
    color: "red",
  },
  TIME_LIMIT_EXCEEDED: {
    value: "Time Limit Exceeded",
    color: "red",
  },
  PRESENTATION_ERROR: {
    value: "Presentation Error",
    color: "red",
  },
  WAITING: {
    value: "Waiting",
    color: "blue",
  },
  OUTPUT_LIMIT_EXCEEDED: {
    value: "Output Limit Exceeded",
    color: "red",
  },
  DANGEROUS_OPERATION: {
    value: "Dangerous Operation",
    color: "red",
  },
  RUNTIME_ERROR: {
    value: "Runtime Error",
    color: "red",
  },
  SYSTEM_ERROR: {
    value: "System Error",
    color: "red",
  },
};
export function getColorByValue(value: any) {
  const result = Object.values(QuestionSubmitJudgeStatusEnum).find(
    (item) => item.value === value
  );
  return result?.color || "black";
}
