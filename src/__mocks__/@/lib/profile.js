export const getWeightHistory = vi.fn(async (token) => {
    if (!token) throw new Error("User not authenticated");
    return [{ id: "w1", weight: 70, date: "2024-01-01" }];
  });
  
  export const addWeight = vi.fn(async (token, weight) => {
    if (!token) throw new Error("User not authenticated");
    return { id: "w2", weight, date: "2024-02-01" };
  });
  
  export const updateWeightRecord = vi.fn(async (token, recordId, weight) => {
    if (!token) throw new Error("User not authenticated");
    return { id: recordId, weight, updated: true };
  });
  
  export const updateUserProfile = vi.fn(async (token, profileData) => {
    if (!token) throw new Error("User not authenticated");
    return { ...profileData, updated: true };
  });
  