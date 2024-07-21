import { useState } from "react";

import "./App.css";

function App() {
  const [text, setText] = useState<string>("");
  const [selectedVoice, setSelectedVoice] = useState<string>();

  async function startTTS() {
    const OPENAI_API_KEY = process.env.REACT_APP_OPENAI_API_KEY;

    const apiUrl = "https://api.openai.com/v1/audio/speech";

    const requestData = {
      model: "tts-1",
      input: text,
      voice: selectedVoice,
    };

    fetch(apiUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.blob();
      })
      .then((blob) => {
        const audioUrl = URL.createObjectURL(blob);
        const audio = new Audio(audioUrl);
        audio.play();
      })
      .catch((error) => {
        console.error("Error occurred:", error);
      });
  }

  return (
    <>
      <header
        style={{
          height: "10%",
          width: "100%",
          borderBottom: "solid 1px hsl(217.2 32.6% 17.5%)",
          color: "white",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "2rem",
        }}
      >
        TTS Program
      </header>
      <main
        style={{
          padding: "2rem",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: "80%",
        }}
      >
        <div
          style={{
            padding: "2rem",
            display: "flex",
            flexDirection: "column",
            gap: "1.8em",
          }}
        >
          <div
            style={{
              gap: "0.8rem",
              display: "flex",
              flexDirection: "column",
              alignItems: "start",
            }}
          >
            <label
              style={{
                color: "white",
                fontSize: "1.2rem",
                width: "20rem",
              }}
            >
              Input Text for TTS
            </label>
            <textarea
              style={{
                border: "solid 1px hsl(217.2 32.6% 17.5%)",
                backgroundColor: "transparent",
                color: "white",
                fontSize: "1rem",
                width: "40rem",
                height: "20rem",
                padding: "1.5rem",
                borderRadius: "1rem",
              }}
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
          </div>
          <div
            style={{
              gap: "0.8rem",
              display: "flex",
              flexDirection: "column",
              alignItems: "start",
            }}
          >
            <label
              style={{
                color: "white",
                fontSize: "1.2rem",
                width: "20rem",
              }}
            >
              Select Voice
            </label>
            <select
              style={{
                border: "solid 1px hsl(217.2 32.6% 17.5%)",
                backgroundColor: "transparent",
                color: "white",
                fontSize: "1rem",
                padding: "1rem",
                width: "100%",
              }}
              value={selectedVoice ? selectedVoice : ""}
              onChange={(e) => setSelectedVoice(e.target.value)}
            >
              <option value="">Select Voice</option>
              <option value="alloy">Alloy</option>
              <option value="echo">Echo</option>
              <option value="fable">Fable</option>
              <option value="onyx">Onyx</option>
              <option value="nova">Nova</option>
              <option value="shimmer">Shimmer</option>
            </select>
          </div>
          <div style={{ display: "flex", width: "100%", gap: "0.8rem" }}>
            <button
              className="tts-start"
              style={{
                border: "solid 1px hsl(217.2 32.6% 17.5%)",
                color: "white",
                fontSize: "1rem",
                padding: "1rem",
                borderRadius: "0.5rem",
                marginTop: "1.5rem",
                width: "100%",
              }}
              onClick={() => startTTS()}
              disabled={text === "" || selectedVoice === ""}
            >
              Start
            </button>
            {/* <button
              className="tts-stop"
              style={{
                border: "solid 1px hsl(217.2 32.6% 17.5%)",
                color: "white",
                fontSize: "1rem",
                padding: "1rem",
                borderRadius: "0.5rem",
                marginTop: "1.5rem",
                width: "50%",
              }}
              onClick={() => audio.pause()}
              disabled={text === ""}
            >
              Stop
            </button> */}
          </div>
        </div>
      </main>
    </>
  );
}

export default App;
