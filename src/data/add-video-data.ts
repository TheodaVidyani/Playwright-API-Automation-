const timestampStr: string = Date.now().toString();

export const addVideoRequestData = (overrides = {}) => ({
    videoKey: timestampStr,
    topic: "video1Initial",
    url: "https://firstvidurl.com",
    grants: [],

  ...overrides
});