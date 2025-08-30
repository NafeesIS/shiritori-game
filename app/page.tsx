"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Trophy, Users } from "lucide-react";
import React, { useEffect, useState } from "react";
import { toast, Toaster } from "sonner";

const HomePage = () => {
  const [inputWord, setInputWord] = useState("");
  const [historyWord, setHistoryWord] = useState<string[]>([]);
  const [timer, setTimer] = useState(10);
  const [playerTurn, setPlayerTurn] = useState<1 | 2>(1);
  const [score, setScore] = useState({ p1: 0, p2: 0 });

  // countdown timer logic set to 10 seconds interval
  useEffect(() => {
    if (timer === 0) {
      setScore((prev) => ({
        ...prev,
        [playerTurn === 1 ? "p1" : "p2"]:
          prev[playerTurn === 1 ? "p1" : "p2"] - 1,
      }));
      setPlayerTurn((prev) => (prev === 1 ? 2 : 1));
      setTimer(10);
      toast.warning("Time's Up!");
    }
    const countDown = setInterval(() => setTimer((t) => t - 1), 1000); // 10 seconds
    return () => clearInterval(countDown);
  }, [timer]);

  // validate any english word by api
  const validateWord = async () => {
    const word = inputWord.toLocaleLowerCase().trim();

    if (word.length < 4) return toast.error("Word must be at least 4 letters!");
    if (historyWord.includes(word))
      return toast.error("This word is already used try another one!");
    if (historyWord && historyWord.length > 0) {
      const lastWord = historyWord[historyWord.length - 1];
      if (word[0] !== lastWord[lastWord.length - 1]) {
        return toast.error(
          "Word Must me start with last latter of previous word!"
        );
      }
    }
    try {
      const res = await fetch(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
      );
      if (!res.ok) {
        setScore((prev) => ({
          ...prev,
          [playerTurn === 1 ? "p1" : "p2"]:
            prev[playerTurn === 1 ? "p1" : "p2"] - 1,
        }));
        return toast.error("Not a valid English Word!");
      }
      toast.success("Valid Word!");
      setScore((prev) => ({
        ...prev,
        [playerTurn === 1 ? "p1" : "p2"]:
          prev[playerTurn === 1 ? "p1" : "p2"] + 1,
      }));
      setPlayerTurn((prev) => (prev === 1 ? 2 : 1));
      setTimer(10);
      setInputWord("");
      setHistoryWord((prev) => [...prev, word]);
    } catch (e) {
      toast.error("Failed to validate");
    }
  };
  const getNextLetter = () => {
    if (historyWord.length === 0) return null;
    const lastWord = historyWord[historyWord.length - 1];
    return lastWord[lastWord.length - 1];
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from blue-50 to-indigo-100 p-4 lg:p-6">
      <div className="max-w-3xl mx-auto">
        <div className="text-center">
          <h1 className="font-bold text-3xl flex justify-center items-center gap-2">
            <Users className="size-5" />
            <span>Shiritori Game</span>
          </h1>
          <p>Connect the words by first and last latter!</p>
        </div>
        <div>
          <h2 className="font-semibold text-xl flex justify-center items-center gap-2 my-4">
            <Trophy className="size-5" /> Scores
          </h2>
          <div className="w-full grid grid-cols-2 text-center text-lg font-semibold gap-4">
            <div className="bg-white border rounded-lg space-y-2 p-2">
              <p>Player 1</p> <p>{score.p1}</p>
            </div>
            <div className="bg-white border rounded-lg space-y-2 p-2">
              <p>Player 2</p> <p>{score.p2}</p>
            </div>
          </div>
          <div>
            <div className="justify-center font-semibold text-xl mt-4 flex items-center gap-2">
              <h3>Player {playerTurn}'s Turn</h3>{" "}
              <p className="text-red-600">({timer} seconds)</p>
            </div>
            {historyWord.length > 0 && (
              <div className="text-center font-medium mt-2 text-xs lg:text-sm">
                Last Word {getNextLetter()}
              </div>
            )}
            <div className="mt-4 flex items-center">
              <Input
                type="text"
                value={inputWord}
                onChange={(e) => setInputWord(e.target.value)}
                placeholder="Enter Your Word"
                className="bg-white rounded-r-none h-8 focus:outline-none focus:ring-0 ring-0 outline-0"
              />
              <Button className="h-8 rounded-l-none" onClick={validateWord}>
                Submit
              </Button>
            </div>
            <div className="mx-auto max-w-80 text-center">
              {historyWord.length > 0 ? (
                <div>
                  <h6 className="text-lg font-bold mt-6 mb-2">Word History</h6>
                  <div className="text-center h-96 overflow-scroll bg-white p-6 ">
                    {historyWord.map((history, index) => (
                      <p
                        className="p-2 border rounded-lg font-medium"
                        key={index}
                      >
                        {history}
                      </p>
                    ))}
                  </div>
                </div>
              ) : (
                <h6 className="text-lg font-bold mt-6 mb-2">No Word History</h6>
              )}
            </div>
          </div>
        </div>
      </div>
      <Toaster position="top-center" closeButton richColors />
    </main>
  );
};

export default HomePage;
