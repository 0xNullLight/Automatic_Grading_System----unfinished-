// src/App.js
import React, { useState } from 'react';
import InputForm from './components/InputForm';
import ResponseOutput from './components/ResponseOutput';
import './App.css'; // Import custom styles

const App = () => {
    const [response, setResponse] = useState(null);

    return (
        <div className="container">
            <h1>Send Data to Ollama</h1>
            <InputForm setResponse={setResponse} />
            {response && <ResponseOutput response={response} />}
        </div>
    );
};

export default App;
