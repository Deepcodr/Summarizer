const express = require('express');
const bodyParser = require('body-parser');
const summarizer = require('node-summarizer');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const PORT = 5000;

//body parser used for parsing request body
app.use(bodyParser.json());
app.use(cors());

mongoose.connect('mongodb://127.0.0.1:27017/summary');

//Summary schema for storing summary
const Summary = mongoose.model('Summary', {
    text: String,
    summary: String,
}, 'summaries');

//SummarizerManager instance for summarizing text
let SummarizerManager = require("node-summarizer").SummarizerManager;

//Post route for summarizing text 
app.post('/summarize', async (req, res) => {
    const { text } = req.body;
    if (!text) {
        return res.status(400).json({ error: 'Text is required' });
    }

    try {
        let Summarizer = new SummarizerManager(text, 10);
        const summaryText = Summarizer.getSummaryByFrequency().summary;
        res.json({ summary: summaryText });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while summarizing the text' });
    }
});

//Post route for saving text summary
app.post('/save-summary', async (req, res) => {
    const { text, summary } = req.body;

    if (!text || !summary) {
        return res.status(400).json({ error: 'Both text and summary are required' });
    }

    try {
        const summaryDoc = new Summary({ text, summary });
        await summaryDoc.save();
        res.status(201).json({ message: 'Summary saved successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while saving the summary' });
    }
});

//Get Route for fetching saved summaries
app.get('/fetch-summaries', async (req, res) => {
    try {
        const summaries = await Summary.find().exec();
        res.json({ summaries });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while fetching summaries' });
    }
});

//Delete route for deleting summary with specific id
app.delete('/delete-summary/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const deletedSummary = await Summary.findByIdAndDelete(id);

        if (!deletedSummary) {
            return res.status(404).json({ error: 'Summary not found' });
        }

        res.json({ message: 'Summary deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while deleting the summary' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
