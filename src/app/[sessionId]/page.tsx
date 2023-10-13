"use client";
import { useState, useCallback, useEffect } from "react";
import { apiRequest } from "../utils/api-functions";
import { url } from "inspector";
import Image from "next/image";
import profilePic from '../../../Pics/images.jpg'
import profilePic2 from '../../../Pics/images2.jpg'

export default function ChatRoute({
  params,
}: {
  params: { sessionId: string };
}) {
  const [data, setData] = useState<any>({});
  const [input, setInput] = useState<any>("");
  const [loading, setLoading] = useState<boolean>(false);

  async function handleFormSubmit(event: any) {
    setLoading(true);
    event.preventDefault();
    const formData = {
      data: {
        input: input,
        sessionId: params.sessionId,
      },
    };
    await apiRequest('/api/send-message', { method: "POST", body: JSON.stringify(formData) });
    await getSession();
    setInput("");
    setLoading(false);
  }

  const getSession = useCallback(async () => {
    const data = await apiRequest(`/api/get-session?sessionId=${params.sessionId}`, {});
    setData(data.data);
  }, []);

  useEffect(() => {
    getSession();
  }, []);

  if (!data) return <div>No chat data!</div>;
  console.log("debug")
  return (
    <div className="relative h-screen flex flex-col p-4">
      <h1 className="text-slate-300 text-white font-bold">
        Chat Session: <span className="text-slate-400  text-black">{data.sessionId}</span>
      </h1>
      <div className="flex-1">
        <div className="flex flex-col">
          <h2 className="text-slate-300 text-white font-bold">Chat Messages</h2>
          {data.history?.map((message: any, index: any) => {
            if (index === 0) return null;
            return (
              <div key={index} className="my-4 flex">
                {
                (message.id[2] === "HumanMessage") ? 
                  <div className="flex flex-row-reverse justify-start w-full"> <header className="py-2 px-4 mb-2 rounded-md flex flex-row-reverse justify-end w-20"> <Image className="rounded-full w-10 items-center flex" src={profilePic} alt=""></Image> </header> <p className="text-slate-400 px-4 items-center flex justify-end bg-[#48cae4] rounded-lg text-white">{message.kwargs.content}</p> </div> : 
                  (message.kwargs.content.includes("oaidall") === true) ? 
                    <div className="flex w-full"><header className="py-2 px-4 mb-2 rounded-md justify-end w-20 "> <Image className="rounded-full w-10 items-center flex" src={profilePic2} alt=""></Image> </header> <p className="text-slate-400 px-4 items-center flex bg-[#E4E6EB] rounded-lg text-black w-fit"><Image src={message.kwargs.content.split("(", 2)[1].split(")", -1)} alt={message.kwargs.content}/></p></div> : 
                    <div className="flex w-full"><header className="py-2 px-4 mb-2 rounded-md justify-end w-20 "> <Image className="rounded-full w-10 items-center flex" src={profilePic2} alt=""></Image> </header> <p className="text-slate-400 px-4 items-center flex bg-[#E4E6EB] rounded-lg text-black w-fit">{message.kwargs.content}</p></div>
                }
                {/*  */}
              </div>
            );
          })}
        </div>
      </div>
      <div className="mt-auto">
        <form
          className="flex justify-between items-center gap-2"
          onSubmit={handleFormSubmit}
        >
          <label className="text-slate-300 hidden">Message</label>
          <input
            className="bg-slate-800 rounded-md p-2 flex-1 text-white bg-[#212529]"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button
            type="submit"
            className="bg-slate-800 text-slate-300 text-white rounded-md p-2 w-24 bg-[#212529]"
            disabled={loading}
          >
            {loading ? "Sending..." : "Send"}
          </button>
        </form>
      </div>
    </div>
  );
}
