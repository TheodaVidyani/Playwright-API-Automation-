const timestampStr: string = Date.now().toString();

export const createUserRequestData = (overrides = {}) => ({
    userId: timestampStr,
    userLevelCode: "admin_user",
    username: "api-test-user",
    password: "123456",
    displayName: "API Test User",
    personalEmail: "",
    nic: "",
    mobile: "",

  ...overrides
});