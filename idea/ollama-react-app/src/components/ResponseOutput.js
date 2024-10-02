// src/components/ResponseOutput.js
import React from 'react';

const ResponseOutput = ({ response }) => {
    return (
        <div>
            <h2>Response:</h2>
            <pre>{JSON.stringify(response, null, 2)}</pre>
        </div>
    );
};

export default ResponseOutput;