import { GoogleGenAI, Type } from "@google/genai";
import { ReportData } from "../types";

const getClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error("API Key not found in environment variables");
  }
  return new GoogleGenAI({ apiKey });
};

export const generateReportInsights = async (data: ReportData): Promise<{ learnings: string[]; topPostsInsight: string }> => {
  try {
    const ai = getClient();
    
    // Construct a context string from the quantitative data
    const dataContext = JSON.stringify({
      platforms: data.platforms,
      highlights: data.highlights,
      topPosts: data.topPosts,
      bottomPosts: data.bottomPosts,
      engagement: data.engagementStats,
      audience: data.audience
    }, null, 2);

    const prompt = `
      You are a senior social media strategist. Analyze the following monthly performance data for a brand.
      
      DATA:
      ${dataContext}

      TASK:
      1. Provide 5 distinct, professional "Monthly Learnings" or strategic takeaways based on the numbers. Style: Agency-style, concise, actionable.
      2. Provide a 1-2 sentence insight on why the top posts performed well based on their format and metrics.

      Return the result in JSON format.
    `;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            learnings: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "List of 5 strategic learnings"
            },
            topPostsInsight: {
              type: Type.STRING,
              description: "Insight explaining why top posts succeeded"
            }
          },
          required: ["learnings", "topPostsInsight"]
        }
      }
    });

    if (response.text) {
        const result = JSON.parse(response.text);
        return {
            learnings: result.learnings,
            topPostsInsight: result.topPostsInsight
        };
    }
    
    throw new Error("Empty response from AI");

  } catch (error) {
    console.error("Gemini API Error:", error);
    // Fallback if API fails or key is missing
    return {
      learnings: [
        "Error generating AI insights. Please check API Key.",
        "Ensure network connection is stable.",
        "Manual analysis required for this month.",
        "Reels typically drive higher engagement—verify manually.",
        "Review top performing content for patterns."
      ],
      topPostsInsight: "AI Analysis unavailable. Please review metrics manually."
    };
  }
};