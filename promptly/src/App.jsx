import React, { useState } from "react";
import "./App.css";
import Navbar from "./components/navbar";

const App = () => {
  const [screen, setScreen] = useState(2);
  let messages = [
    {
      role: "user",
      content: "You are a helpful assistant.",
    },
    {
      role: "assistant",
      content: "How can I assist you today?",
    },
    {
      role: "user",
      content: "What is the weather like today?",
    },
    {
      role: "assistant",
      content:
        "I'm not sure, but you can check a weather website for the latest updates.",
    },
  ]
  return (
    <div>
      <Navbar />
      <div className="screens">
        {screen === 1 ? (
          <div className="screen-1 w-screen  h-[55vh] px-[150px] flex items-center justify-center flex-col">
            <h3 className="text-[25px] font-[700] text-purple-500">PromptLy</h3>
          </div>
        ) : (
          <>
            <div className="screen-2 w-screen  h-[55vh] px-[150px]">
              {messages
                ? messages.map((item, index) => {
                    return (
                      <>
                        {item.role === "user" ? 
                          <div className="user bg-gray-500 w-fit max-w-[40vw] mb-3 ml-[auto] p-[15px]">
                            <p className="text-[white] text-[20px]">User</p>
                            <p>{item.content}</p>
                          </div>
                         : 
                          <div className="assistant bg-purple-500 w-fit max-w-[40vw] mb-3 mr-[auto] p-[15px]">
                            <p className="text-[white] text-[20px]">
                              Assistant
                            </p>
                            <p>{item.content}</p>
                          </div>
                        }
                      </>
                    );
                  })
                : "No messages found."}
            </div>
          </>
        )}
      </div>
      <div className="inputbox flex items-center justify-center h-[30vh] px-[150px]">
        <div className="input w-[90%] mx-[auto] flex items-center gap-[10px] bg-zinc-800 rounded-lg">
          <input
            type="text"
            placeholder="Enter your prompt here..."
            className="flex-1 bg-transparent rounded-lg p-[15px] outline-none text-[20px] font-[500] text-white"
          />
        </div>
      </div>
    </div>
  );
};

export default App;
