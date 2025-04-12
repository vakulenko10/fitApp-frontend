import { mockUser } from '@/__mocks__/mockUser'; 

export const getWeightHistory = vi.fn(async (token) => {
    if (!token) throw new Error("User not authenticated");
  
    return Promise.resolve({
      history: [
        {
          id: "6d76dbdf-5a42-49a6-b60b-25671c30249f",
          userId: "99ec1437-6692-47d0-8cf7-b8172e6b50e2",
          weight: "200",
          recordedAt: "2025-03-24T00:04:56.957Z",
        },
        {
          id: "a721a015-2942-4e29-917d-0d56bc99c901",
          userId: "99ec1437-6692-47d0-8cf7-b8172e6b50e2",
          weight: "200",
          recordedAt: "2025-03-23T23:50:02.032Z",
        },
        {
          id: "c0b4ae52-266f-4266-a087-cbea0263288b",
          userId: "99ec1437-6692-47d0-8cf7-b8172e6b50e2",
          weight: "200",
          recordedAt: "2025-03-22T18:32:06.067Z",
        },
        {
          id: "bea80d27-453a-4aae-9581-85580247e4c4",
          userId: "99ec1437-6692-47d0-8cf7-b8172e6b50e2",
          weight: "100",
          recordedAt: "2025-03-17T23:35:00.543Z",
        },
        {
          id: "63113354-c73c-42c4-a38b-1356cae3d806",
          userId: "99ec1437-6692-47d0-8cf7-b8172e6b50e2",
          weight: "92",
          recordedAt: "2025-03-17T23:32:58.222Z",
        },
        {
          id: "cb1ecb25-5eae-41ff-ad5d-a03590f2d0f5",
          userId: "99ec1437-6692-47d0-8cf7-b8172e6b50e2",
          weight: "92",
          recordedAt: "2025-03-17T23:32:10.023Z",
        },
        {
          id: "8e65b21b-3ac2-49d7-8ffd-821283715378",
          userId: "99ec1437-6692-47d0-8cf7-b8172e6b50e2",
          weight: "85",
          recordedAt: "2025-03-17T23:31:43.728Z",
        },
      ],
    });
  });


export const addWeight = vi.fn(async (token, weight) => {
  if (!token) throw new Error("User not authenticated");

  return Promise.resolve({
    id: "e8419d84-048f-46fa-b09a-6947a686c33c",
    userId: mockUser.id,
    weight: String(weight),
    recordedAt: new Date().toISOString(),
    user: mockUser,
  });
});

  export const updateWeightRecord = vi.fn(async (token, recordId, weight) => {
    if (!token) throw new Error("User not authenticated");
    return { id: recordId, weight, updated: true };
  });
  
 
export const updateUserProfile = vi.fn(async (token, profileData) => {
    if (!token) throw new Error("User not authenticated");
  
    return Promise.resolve({
      message: "Profile updated successfully",
      user: {
        ...mockUser,
        ...profileData, // simulate updated fields
      },
    });
  });