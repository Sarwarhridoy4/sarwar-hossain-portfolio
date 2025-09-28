// src/app/test/test.service.ts
export const TestService = {
  getSecretData: async () => {
    return {
      message: "This is protected data accessible only to authenticated users",
      timestamp: new Date().toISOString(),
    };
  },
};
