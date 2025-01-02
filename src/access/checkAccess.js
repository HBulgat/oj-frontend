import ACCESS_ENUM from "./accessEnum";
const checkAccess = (loginUser, needAccess = ACCESS_ENUM.NOT_LOGIN) => {
    const loginUserAccess = loginUser?.userRole ?? ACCESS_ENUM.NOT_LOGIN;
    console.log("checkAccess", loginUser, needAccess);
    if (needAccess === ACCESS_ENUM.NOT_LOGIN) {
        return true;
    }
    if (needAccess === ACCESS_ENUM.USER) {
        if (loginUserAccess === ACCESS_ENUM.NOT_LOGIN) {
            return false;
        }
    }
    if (needAccess == ACCESS_ENUM.ADMIN) {
        if (loginUserAccess !== ACCESS_ENUM.ADMIN) {
            return false;
        }
    }
    return true;
};
export default checkAccess;
//# sourceMappingURL=checkAccess.js.map