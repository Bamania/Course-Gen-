import React, { useState, useEffect } from 'react';
import { Edit2, Check, X } from 'lucide-react';
import { useDispatch, useSelector } from "react-redux";
import {setSelectedTitle } from "../../Slices/titleSlice";
import { useNavigate } from 'react-router-dom';

export default function SelectTopic() {
  const dispatch = useDispatch();
  const [datarec, setDatarec] = useState(true);
  const TitleStorage = useSelector((state) => state.TITLE_STORAGE);
  const [localSelectedTitle, setLocalSelectedTitle] = useState("");
  const navigate = useNavigate();

  console.log("Data from title storage", TitleStorage);
  // console.log("Data to be given in the parse function", TitleStorage.aiGeneratedTitle[2]);
  console.log("Type of the input", typeof(TitleStorage.aiGeneratedTitle[2]));

  // Function to convert the result to an array

  const [aigeneratedTitle, setAigeneratedTitle] = useState([]);

  // useEffect(async() => {
  //   setAigeneratedTitle(TitleStorage.aiGeneratedTitle);

  //   console.log("data from the redux in a parsed format", TitleStorage.ParsedGeneratedTitle);
  //   if (TitleStorage.aiGeneratedTitle.length > 2) {
  //     dispatch(TitleStorage.aiGeneratedTitle);
  //   }
  //   setDatarec(true); // Mark data as received
  // }, []);

  const handleTitleSelection = (title) => {
    setLocalSelectedTitle(title);
    dispatch(setSelectedTitle(title));
  };

  const handleNextClick = () => {
    console.log(TitleStorage.selectedTitle)
    navigate("/course");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 p-6">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">AI Generated Course Content</h1>
          <p className="text-gray-600 mb-8">Track your progress and customize your learning path</p>
          {console.log(datarec)}
          { TitleStorage.aiGeneratedTitle[2]? (
            <div className="space-y-4">
              {TitleStorage.aiGeneratedTitle[2].map((item, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <input
                    type="radio"
                    name="selectedTitle"
                    id={`radio-${index}`}
                    className="w-5 h-5 text-indigo-600 rounded border-gray-300 focus:ring-indigo-500"
                    onChange={() => handleTitleSelection(item)}
                  />
                  <label htmlFor={`radio-${index}`} className="text-gray-700">
                    {item}
                  </label>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-500">Loading...</div>
          )}
          <div className="mt-8 text-right">
            <button 
              className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
              onClick={handleNextClick}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
