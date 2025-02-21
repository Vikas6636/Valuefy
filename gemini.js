const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

const prompt = `You are an AI that processes user input and extracts structured information. Given a text input, return a JSON object with the following fields:

1. **summary**: A concise summary of the text.
2. **calendar_events**: A list of events mentioned in the text, including date, time, and description.
3. **emails**: A list of emails that need to be sent, with recipient names and email bodies.
4. **todo_tasks**: A list of tasks extracted from the text.

If dates are like tomorrow or next week, convert them to the corresponding dates.
Strictly follow the date format as "YYYY-MM-DD".

Ensure the output is strictly in JSON format without any additional text.

Example output:
{
  "summary": "Team meeting scheduled for Monday. John needs to email the client. Buy office supplies.",
  "calendar_events": [
    {
      "title": "Team Meeting",
      "start": "2025-02-22"
    }
  ],
  "emails": [
    {
      "to": "john@example.com",
      "subject": "Follow-up with client",
      "body": "John, please send a follow-up email to the client regarding the project status."
    }
  ],
  "todo_tasks": [
    title: "Buy office supplies",
    due_date: "2025-02-20"
  ]
}

Now, process the following input and return the JSON output:
 `;

const generate = async (data) => {
  try {
    const result = await model.generateContent(prompt + data);
    const responseText = result.response.candidates[0].content.parts[0].text;
    const trimmedResponse = responseText.slice(7, -3);
    const jsonResponse = JSON.parse(trimmedResponse);
    console.log(jsonResponse.todo_tasks);
    return jsonResponse;
  } catch (err) {
    console.log(err);
    return "Error generating summary";
  }
};

module.exports = { generate: generate };

