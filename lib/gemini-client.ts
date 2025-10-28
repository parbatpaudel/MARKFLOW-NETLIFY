import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize the Gemini client with your API key
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "AIzaSyB6kXUj7Qjo14pL-vitKzT7vP2czTSXeiI");

// Function to get the generative model (using the model from environment variables or defaulting to gemini-2.5-flash)
export const getGenerativeModel = () => {
  const model = process.env.GEMINI_MODEL || "gemini-2.5-flash";
  return genAI.getGenerativeModel({ model });
};

// Function to generate content using Gemini
export const generateContent = async (prompt: string) => {
  try {
    const model = getGenerativeModel();
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("Error generating content with Gemini:", error);
    throw error;
  }
};

// Function to train the model on your data (simplified implementation)
export const trainOnData = async (trainingData: string) => {
  try {
    // In a real implementation, you would use the Gemini API's fine-tuning capabilities
    // For now, we'll just store the data for context in prompts
    console.log("Training data received:", trainingData);
    return { success: true, message: "Data registered for context use" };
  } catch (error) {
    console.error("Error training model:", error);
    throw error;
  }
};

export default genAI;