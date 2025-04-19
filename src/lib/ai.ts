import { openai } from './openai';

// Generate blog post summary
export async function generateBlogSummary(content: string) {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "You are a technical content summarizer. Create concise summaries of technical blog posts."
        },
        {
          role: "user",
          content: `Summarize this blog post in 2-3 sentences: ${content}`
        }
      ]
    });
    return response.choices[0].message.content;
  } catch (error) {
    console.error('Error generating blog summary:', error);
    return null;
  }
}

// Analyze user's Q&A behavior
export async function analyzeUserBehavior(questions: any[]) {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "You are an AI that analyzes user behavior and provides insights."
        },
        {
          role: "user",
          content: `Analyze these questions and provide insights about the user's interests: ${JSON.stringify(questions)}`
        }
      ]
    });
    return response.choices[0].message.content;
  } catch (error) {
    console.error('Error analyzing user behavior:', error);
    return null;
  }
}

// Smart search with AI-powered relevance
export async function smartSearch(query: string, content: any[]) {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "You are a search assistant. Find the most relevant content based on the query."
        },
        {
          role: "user",
          content: `Find relevant matches for "${query}" in: ${JSON.stringify(content)}`
        }
      ]
    });
    return response.choices[0].message.content;
  } catch (error) {
    console.error('Error performing smart search:', error);
    return null;
  }
} 