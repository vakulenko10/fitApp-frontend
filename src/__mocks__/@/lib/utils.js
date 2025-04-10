export const getCookie = vi.fn((name) => {
    if (name === "token") return "mock-token";
    return null;
  });
  