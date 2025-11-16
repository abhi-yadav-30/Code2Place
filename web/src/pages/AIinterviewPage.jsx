import { useEffect } from "react";
import { useRef, useState } from "react";

const AIinterviewPage = () => {
  const videoRef = useRef(null);
  const recorderRef = useRef(null);
  const chunks = useRef([]);

  const [question, setQuestion] = useState("Introduce yourself.");
  const [feedback, setFeedback] = useState("");
  const [answerText, setAnswerText] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [recordTime, setRecordTime] = useState(0);
  const [camera, setCamera] = useState(false);

  useEffect(() => {
    let interval;
    if (isRecording) {
      interval = setInterval(() => {
        setRecordTime((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRecording]);

  const formatTime = (seconds) => {
    const m = String(Math.floor(seconds / 60)).padStart(2, "0");
    const s = String(seconds % 60).padStart(2, "0");
    return `${m}:${s}`;
  };

  const startCamera = async () => {
    const videoStream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: false,
    });

    videoRef.current.srcObject = videoStream;
    videoRef.current.play();

    const audioStream = await navigator.mediaDevices.getUserMedia({
      audio: true,
    });

    recorderRef.current = new MediaRecorder(audioStream, {
      mimeType: "audio/webm; codecs=opus",
    });
    setCamera(true);
  };

  const startRecording = () => {
    if (!camera) alert("need to start camera to start interview ");
    setIsRecording(true);
    const recorder = recorderRef.current;

    recorder.ondataavailable = (e) => chunks.current.push(e.data);

    recorder.onstop = async () => {
      const blob = new Blob(chunks.current, { type: "audio/webm" });
      chunks.current = [];

      const form = new FormData();
      form.append("audio", blob, "recording.webm");

      const res = await fetch(
        "http://localhost:5000/api/interview/transcribe",
        {
          method: "POST",
          body: form,
        }
      );

      const data = await res.json();
      setAnswerText(data.text);

      const aiRes = await fetch("http://localhost:5000/api/interview/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ answer: data.text }),
      });

      const ai = await aiRes.json();
      if (ai.error) {
        console.log("error occured : ", ai.error);
        return;
      }
      setQuestion(ai.nextQuestion);
      setFeedback(ai.shortFeedback);
    };

    recorder.start();
  };

  const stopRecording = () => {
    setIsRecording(false);
    return recorderRef.current.stop();
  };

  return (
    <div className="min-h-screen bg-[#262626] text-white flex flex-col items-center px-6 py-5">
      <div className=" w-full h-[86vh] max-w-7xl bg-[#1f1f1f] rounded-2xl shadow-lg p-8 pt-5 border border-gray-700">
        <h1 className="text-3xl font-bold mb-6 text-center">
          AI Mock Interview
        </h1>

        <div className="flex justify-center items-center gap-52 mb-6">
          <video
            ref={videoRef}
            className="rounded-xl w-[300px] h-[220px] bg-black border border-gray-600 shadow-lg"
          ></video>

          <div className=" h-40">
            <div className="flex gap-4 mb-4">
              <button
                onClick={startCamera}
                disabled={camera}
                className=" bg-indigo-700 hover:bg-indigo-600 flex items-center gap-2 px-6 py-2 rounded-xl cursor-pointer
          disabled:opacity-60 disabled:bg-indigo-300 disabled:cursor-not-allowed disabled:text-gray-100"
              >
                Start Camera
              </button>

              <button
                onClick={startRecording}
                disabled={isRecording || !camera}
                className="flex items-center gap-2  text-white px-6 py-2 rounded-xl  transition bg-teal-700 hover:bg-teal-600 cursor-pointer
          disabled:opacity-60 disabled:bg-teal-300 disabled:cursor-not-allowed disabled:text-gray-100"
              >
                Start Answer
              </button>

              <button
                onClick={stopRecording}
                disabled={!isRecording}
                className=" bg-rose-700 hover:bg-rose-600 flex items-center gap-2 px-6 py-2 rounded-xl cursor-pointer
          disabled:opacity-60 disabled:bg-rose-300 disabled:cursor-not-allowed disabled:text-gray-100"
              >
                Stop Answer
              </button>
            </div>

            <div className="flex justify-center">
              <div className="w-60 flex items-center justify-center gap-4 bg-red-900/20 border border-red-500/40 px-4 py-2 rounded-lg shadow-md">
                {isRecording ? (
                  <div className="w-3 h-3 bg-red-500 rounded-full animate-ping"></div>
                ) : (
                  <i className="fa-solid fa-pause text-red-500"></i>
                )}
                <span className="text-red-300 font-semibold">
                  {" "}
                  {!isRecording ? "Paused" : "Recording"}
                </span>
                <span className="text-red-400 font-mono text-lg">
                  {formatTime(recordTime)}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex">
          <div className="h-[40vh] w-[65%] overflow-y-auto">
            {feedback && (
              <div>
                <span className="text-xl font-semibold mb-4 text-amber-300 font-serif">
                  Feedback:{" "}
                </span>
                <span className="text-xl font-semibold mb-4 text-gray-200">
                  {feedback}
                </span>
              </div>
            )}

            <span className="text-xl font-semibold mb-4 text-amber-300 font-serif">
              Question:{" "}
            </span>
            <span className="text-xl font-semibold mb-4 text-emerald-300">
              {question}
            </span>
          </div>

          <div className="bg-[#2c2c2c] p-4 rounded-xl border border-gray-700 shadow-md w-[34%] ml-3 h-[40vh] overflow-y-auto">
            <h3 className="text-lg font-bold  text-gray-200">Your Answer :</h3>
            <p className="text-gray-300 whitespace-pre-line">
              {answerText}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIinterviewPage;
