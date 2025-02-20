const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

const prompt = "meaning of amritesh in one word";

const generate = async () => {
    try {
        const result = await model.generateContent(prompt);
        const responseText = result.response.candidates[0].content.parts[0].text;
        console.log(responseText);
    } catch (err) {
        console.log(err);
    }
};

generate();

