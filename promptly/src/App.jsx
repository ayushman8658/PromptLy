import React, { useState } from "react";
import "./App.css";
import Navbar from "./components/navbar";
import { GoogleGenAI } from "@google/genai";
import { SyncLoader } from "react-spinners";
import Markdown from "react-markdown";
import { GrPersonalComputer } from "react-icons/gr";
import { IoSearchSharp } from "react-icons/io5";
import { FaBrain } from "react-icons/fa";
import { FaCode } from "react-icons/fa";
//AIzaSyDuOqibwBMk6F_DRGhzbYetpyqsgZft444
const App = () => {
  const [screen, setScreen] = useState(1);
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);

  const ai = new GoogleGenAI({
    apiKey: "AIzaSyDuOqibwBMk6F_DRGhzbYetpyqsgZft444",
  });
  let messages = [];
  const [data, setData] = useState(messages);

  async function getResponse() {
    if (!prompt) {
      alert("Please enter a prompt.");
      return;
    }
    setData((prev) => [...prev, { role: "user", content: prompt }]);
    setScreen(2);
    setLoading(true);
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });
    setData((prev) => [...prev, { role: "assistant", content: response.text }]);
    //console.log(response.text);
    setPrompt("");
    setLoading(false);
  }
  return (
    <div>
      <Navbar />
      <div className="screens">
        {screen === 1 ? (
          <div className="screen-1 w-screen  h-[55vh] px-[150px] flex items-center justify-center flex-col">
            <h3 className="title text-[25px] font-[700] text-purple-500">PromptLy</h3>
            <p className="text-[40px] text-gray-500">
              Your thoughts, my words -- let's create something amazing.
            </p>
            <div className="flex mt-5 items-center gap-[15px]">
              <div className="card w-[200px] h-[150px] cursor-pointer bg-gray-800  transition-all hover:bg-purple-500 rounded-lg p-[15px]">
                <i className="text-[30px] ">
                  <GrPersonalComputer />
                </i>
                <p className="mt-3">
                  Create a prompt for your AI model to generate content.
                </p>
              </div>

              <div className="card w-[200px] h-[150px] cursor-pointer bg-gray-800  transition-all hover:bg-purple-500 rounded-lg p-[15px]">
                <i className="text-[30px]">
                  <IoSearchSharp />
                </i>
                <p className="mt-3">
                  Search for prompts to use with your AI model.
                </p>
              </div>
              <div className="card w-[200px] h-[150px] cursor-pointer bg-gray-800  transition-all hover:bg-purple-500 rounded-lg p-[15px]">
                <i className="text-[30px]">
                  <FaBrain />
                </i>
                <p className="mt-3">
                  Generate prompts using AI for your AI models.
                </p>
              </div>
              <div className="card w-[200px] h-[150px] cursor-pointer bg-gray-800  transition-all hover:bg-purple-500 rounded-lg p-[15px]">
                <i className="text-[30px]">
                  <FaCode />
                </i>
                <p className="mt-3">
                  Generate code snippets using AI for your AI models.
                </p>
                </div>



            </div>
          </div>
        ) : (
          <>
            <div className="screen-2 overflow-y-auto w-screen  h-[70vh] px-[150px]">
              {data
                ? data.map((item, index) => {
                    return (
                      <>
                        {item.role === "user" ? (
                          <div className="user bg-gray-500 w-fit max-w-[40vw] mb-5 ml-[auto] p-[5px] rounded-2xl">
                            <p className="text-[white] text-[20px]"></p>
                            <p>{item.content}</p>
                          </div>
                        ) : (
                          <div className="assistant bg-purple-500 w-fit max-w-[40vw] mb-5 mr-[auto] p-[5px] rounded-2xl">
                            <p className="text-[white] text-[20px]">
                              
                            </p>
                            <Markdown>{item.content}</Markdown>
                          </div>
                        )}
                      </>
                    );
                  })
                : "No messages found."}
              {loading ? (
                <div className="loader">
                  <SyncLoader color="#fff" />
                </div>
              ) : null}
            </div>
          </>
        )}
      </div>
      <div className="inputbox h-[15vh] px-[150px] pt-3">
        <div className="input w-[90%] mx-[auto] flex items-center gap-[10px] bg-zinc-800 rounded-lg">
          <input
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                getResponse();
              }
            }}
            onChange={(e) => setPrompt(e.target.value)}
            value={prompt}
            type="text"
            placeholder="Enter your prompt here..."
            className="flex-1 bg-transparent rounded-lg p-[15px] outline-none text-[20px] font-[500] text-white"
          />
        </div>

        <p className="text-[gray] text-center mt-3">
          Promptly can make mistake pls cross check it.
        </p>
      </div>
    </div>
  );
};

export default App;
