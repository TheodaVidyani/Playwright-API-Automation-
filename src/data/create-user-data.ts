
export const createUserRequestData = (overrides = {}) => ({
    userId: "USER-0002",
    userLevelCode: "admin_user",
    username: "api-test-user",
    password: "123456",
    displayName: "API Test User",
    personalEmail: "",
    nic: "",
    mobile: "",

  ...overrides
});