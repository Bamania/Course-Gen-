import React, { useState, useEffect } from 'react';
import { Edit2, Check, X } from 'lucide-react';
import { useSelector } from "react-redux";

export default function SelectTopic() {
  const [datarec, setDatarec] = useState(true);
  const TitleStorage = useSelector((state) => state.TITLE_STORAGE);
  console.log("Data from title storage", TitleStorage);
  console.log("Data from title aigenerated", TitleStorage.aiGeneratedTitle);

  const [aigeneratedTitle, setAigeneratedTitle] = useState([]);

  useEffect(() => {
  
      setAigeneratedTitle(TitleStorage.aiGeneratedTitle);
      setDatarec(true); // Mark data as received
    
  }, [TitleStorage]);

  const [editing, setEditing] = useState(false);
  const [editValue, setEditValue] = useState('');

  const handleCheck = () => {
    setAigeneratedTitle({
      ...aigeneratedTitle,
      isCompleted: !aigeneratedTitle.isCompleted,
    });
  };

  const handleEditStart = () => {
    setEditing(true);
    setEditValue(aigeneratedTitle.title);
  };

  const handleEditSave = () => {
    if (editValue.trim()) {
      setAigeneratedTitle({
        ...aigeneratedTitle,
        title: editValue.trim(),
      });
    }
    setEditing(false);
    setEditValue('');
  };

  const handleEditCancel = () => {
    setEditing(false);
    setEditValue('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 p-6">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">AI Generated Course Content</h1>
          <p className="text-gray-600 mb-8">Track your progress and customize your learning path</p>
            console.log(datarec)
          {datarec ? (
            TitleStorage.aiGeneratedTitle.map((item, index) => (
              <div key={index}>
                {/* Handle rendering of objects if necessary */}
                {typeof item === 'string' ? (
                  <h1 className='text-red-500'>{item}</h1>
                ) : (
                  <h1 className='text-red-500'>{item.result}</h1>
                )}
                <h2 className='text-red-500'>Hello</h2>
              </div>
            ))
          ) : (
            <div className="text-center text-gray-500">Loading...</div>
          )}

          <div className="mt-8 p-4 bg-indigo-50 rounded-lg">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-lg font-semibold text-indigo-900">Progress</h3>
                <p className="text-indigo-600">
                  {aigeneratedTitle && aigeneratedTitle.isCompleted ? 1 : 0} of 1 completed
                </p>
              </div>
              <div className="w-32 h-32 relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-2xl font-bold text-indigo-600">
                    {aigeneratedTitle && aigeneratedTitle.isCompleted ? 100 : 0}%
                  </span>
                </div>
                <svg className="transform -rotate-90 w-32 h-32">
                  <circle
                    cx="64"
                    cy="64"
                    r="56"
                    className="stroke-current text-indigo-100"
                    strokeWidth="8"
                    fill="none"
                  />
                  <circle
                    cx="64"
                    cy="64"
                    r="56"
                    className="stroke-current text-indigo-600"
                    strokeWidth="8"
                    fill="none"
                    strokeLinecap="round"
                    strokeDasharray={352}
                    strokeDashoffset={aigeneratedTitle && aigeneratedTitle.isCompleted ? 0 : 352}
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
