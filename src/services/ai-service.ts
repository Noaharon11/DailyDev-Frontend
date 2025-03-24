import apiClient from "./api-client";

// This is the shape of the expected response from the server
interface AiChallengeResponse {
  challenge: string;
}

// Function to get a challenge from AI based on a given topic
export const getAiChallenge = async (topic: string): Promise<string> => {
  try {
    const response = await apiClient.post<AiChallengeResponse>(
      "/api/ai/challenge",
      { topic }
    );
    return response.data.challenge;
  } catch (error) {
    console.error("Failed to fetch AI challenge:", error);
    throw error;
  }
};
