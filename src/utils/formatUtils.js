const formatTimeLimit = (judgeConfig) => {
    return ("Java  :" +
        judgeConfig.languageJavaJudgeConfig.timeLimit +
        "ms    " +
        "C     :" +
        judgeConfig.languageCJudgeConfig.timeLimit +
        "ms\n" +
        "C++   :" +
        judgeConfig.languageCppJudgeConfig.timeLimit +
        "ms    " +
        "Python:" +
        judgeConfig.languagePythonJudgeConfig.timeLimit +
        "ms\n");
};
const formatMemoryLimit = (judgeConfig) => {
    return ("Java  :" +
        judgeConfig.languageJavaJudgeConfig.memoryLimit +
        "KB    " +
        "C     :" +
        judgeConfig.languageCJudgeConfig.memoryLimit +
        "KB\n" +
        "C++   :" +
        judgeConfig.languageCppJudgeConfig.memoryLimit +
        "KB    " +
        "Python:" +
        judgeConfig.languagePythonJudgeConfig.memoryLimit +
        "KB\n");
};
export default formatTimeLimit;
formatTimeLimit;
//# sourceMappingURL=formatUtils.js.map