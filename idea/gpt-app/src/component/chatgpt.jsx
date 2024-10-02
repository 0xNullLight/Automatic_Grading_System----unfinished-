//chatgpt.jsx

import React, { useState } from "react";
import axios from "axios";

export default function ChatGPT() {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const HTTP = "http://localhost:3001/chat";

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    axios
      .post(`${HTTP}`, { prompt })
      .then((res) => {
        setResponse(res.data);
      })
      .catch((error) => {
        console.log(error);
        setResponse("There was an error. Please try again.");
      })
      .finally(() => {
        setLoading(false);
        setPrompt("");
      });
  };

  const handlePrompt = (e) => {
    setPrompt(e.target.value);
  };

  return (
    <div className="container container-sm p-1">
      <h1 className="title text-center text-darkGreen">ChatGPT API</h1>
      <form className="form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="">Ask questions</label>
          <input
            type="text"
            className="shadow-sm"
            placeholder="Enter text"
            value={prompt}
            onChange={handlePrompt}
          />
        </div>
        <button className="btn btn-accept w-100" type="submit" disabled={loading}>
          {loading ? "Loading..." : "Go"}
        </button>
      </form>
      <div className="bg-darkGreen mt-2 p-1 border-5">
        <p className="text-light">
          {response ? response : "Ask me anything..."}
        </p>
      </div>
    </div>
  );
}