// src/components/InputForm.js
import React, { useState } from 'react';
import axios from 'axios';

const InputForm = ({ setResponse }) => {
    const [prompt, setPrompt] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!prompt) {
            alert('Please enter a prompt.');
            return;
        }

        try {
            const response = await axios.post('http://localhost:11434/api/generate', {
                prompt: prompt,
                model: "codellama",
            });
        
            // Clean up the response data
            let responseData = response.data;
        
            // Split the response into individual JSON strings
            const jsonStrings = responseData.split('\n').filter(Boolean);
        
            // Initialize an array to hold the parsed responses
            const parsedResponses = [];
        
            // Iterate over each JSON string and parse it
            for (const jsonString of jsonStrings) {
                try {
                    const parsedObject = JSON.parse(jsonString);
        
                    // Check if the response field exists and is not empty
                    if (parsedObject.response) {
                        parsedResponses.push(parsedObject.response);
                    }
                } catch (error) {
                    console.error('Error parsing JSON string:', error);
                }
            }
        
            // Join the responses into a single string
            let cleanedResponse = parsedResponses.join('');
        
            // Final cleanup: Trim whitespace and remove unnecessary escape characters
            cleanedResponse = cleanedResponse.trim().replace(/^\s+|\s+$/g, '').replace(/"@.*?"/g, '');
        
            // Log the cleaned response
            console.log(cleanedResponse);
            setResponse(cleanedResponse);
        } catch (error) {
            console.error('Error fetching data:', error);
            setResponse({ error: error.message });
        }
        
    };

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="inputPrompt">Input Prompt:</label>
            <textarea
                id="inputPrompt"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Enter your prompt here..."
                required
            />
            <button type="submit">Send Data</button>
        </form>
    );
};

export default InputForm;
