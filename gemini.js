const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

const prompt = "In today's meeting, we outlined ten key tasks with specific deadlines: Finalize project documentation by February 25, 2025. Complete API integration by March 1, 2025. Begin initial testing on March 3, 2025. Enhance UI/UX by March 5, 2025. Optimize database performance by March 7, 2025. Conduct a security audit by March 10, 2025. Complete final testing and bug fixes by March 12, 2025. Review client feedback by March 15, 2025. Prepare for deployment by March 18, 2025. Launch the project and monitor performance on March 20, 2025. Each team member has assigned responsibilities, and progress will be tracked regularly. so finnally extract some data like title and meeting data from this converstation.Give the respoce in [{ title: 'Meeting', start: '2025-02-22' },{ title: 'Project Deadline', start: '2025-02-25' },{ title: 'Code Review', start: '2025-02-28' }] dont give any explanation only give json data";



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

