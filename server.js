const express = require('express');
const path = require('path');
const { generate } = require('./gemini.js'); // Assuming generate() processes text and returns a summary

const app = express();
const PORT = 3000;

// Middleware to parse JSON requests
app.use(express.json());

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Summarization API
app.post("/summarize", async (req, res) => {
    try {
        const { text } = req.body; // Extract text from request body

        if (!text || text.trim() === "") {
            return res.status(400).json({ error: "Text input is required for summarization" });
        }

        const gemini_response = await generate(text); // Call your generate function

        res.send({ gemini_response }); // Send the summary in JSON format
    } catch (error) {
        console.error("Error generating summary:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});