const timestampStr: string = Date.now().toString();

export const addVideoRequestData = (overrides = {}) => ({
  tree: [
        {
            nodeId: 85,
            videos: [
                {
                    videoKey: "vid-mstwpgy4-eldrp560",
                    topic: "video1Initial",
                    url: "https://firstvidurl.com"
                }
            ]
        }
    ],
    ...overrides
});