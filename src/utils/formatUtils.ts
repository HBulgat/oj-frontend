const formatTimeLimit = (judgeConfig: any) => {
  return (
    `Java  :${judgeConfig.languageJavaJudgeConfig.timeLimit}ms\nC     :${judgeConfig.languageCJudgeConfig.timeLimit}ms\n` +
    `Cpp   :${judgeConfig.languageCppJudgeConfig.timeLimit}ms\n` +
    `Python:${judgeConfig.languagePythonJudgeConfig.timeLimit}ms\n`
  );
};
const formatMemoryLimit = (judgeConfig: any) => {
  return (
    "Java  :" +
    judgeConfig.languageJavaJudgeConfig.memoryLimit +
    "KB    " +
    "C     :" +
    judgeConfig.languageCJudgeConfig.memoryLimit +
    "KB    \n" +
    "C++   :" +
    judgeConfig.languageCppJudgeConfig.memoryLimit +
    "KB    " +
    "Python:" +
    judgeConfig.languagePythonJudgeConfig.memoryLimit +
    "KB"
  );
};

export default { formatTimeLimit, formatMemoryLimit };
