import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { useDispatch } from "react-redux";
import {
  Brain,
  BookOpen,
  Plus,
  ChevronRight,
  Settings,
  LogOut,
  History,
  Trash2,
} from "lucide-react";
import { SaveTitle } from "../../Slices/titleSlice";
import SelectTopic from "../SelectTopic";

  export const Dashboard = () => {
    const dispatch = useDispatch();
    const [courses, setCourses] = useState([
      { id: '1', title: 'Advanced JavaScript Concepts', date: '2024-03-10', progress: 60 },
      { id: '2', title: 'Machine Learning Basics', date: '2024-03-08', progress: 30 },
      { id: '3', title: 'UI/UX Design Principles', date: '2024-03-05', progress: 85 },
    ]);
    const navigate = useNavigate();
    const [isGenerating, setIsGenerating] = useState(false);
    const [generatedTopic, setGeneratedTopic] = useState([]);
    const [topic, setTopic] = useState("");
const backend_url= process.env.BACKEND_URL || "http://localhost:5000/title"
const handleGenerateCourse = async () => {
    try {
      setIsGenerating(true);
      const headers = {
        'Content-Type': 'application/json',
      };
      const response = await axios.get(backend_url, {
        params: { title: topic }, 
        headers,
      });
      console.log(response.data);
      setGeneratedTopic(response.data);
      dispatch(SaveTitle(response.data.result.titles));
      navigate("/selectTopic");
   
    } catch (error) {
      console.error("Error generating course:", error.response?.data || error.message);
      alert("Failed to generate course. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };
  
  
    const handleDeleteCourse = (courseId) => {
      setCourses(courses.filter(course => course.id !== courseId));
    };
  
    return (
      <div className="min-h-screen bg-gray-50 flex">
        {/* Sidebar */}
        <div className="w-64 bg-white border-r border-gray-200">
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center space-x-2">
              <Brain className="w-8 h-8 text-indigo-600" />
              <span className="text-xl font-bold text-gray-800">LearnPath AI</span>
            </div>
          </div>
          
          <div className="p-4">
            <div className="space-y-4">
              <button
                onClick={handleGenerateCourse}
                className="w-full flex items-center justify-center space-x-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
              >
                <Plus className="w-5 h-5" />
                <span>New Course</span>
              </button>
              
              <div className="space-y-2">
                <div className="flex items-center space-x-2 text-gray-600 px-4 py-2">
                  <History className="w-5 h-5" />
                  <span className="font-medium">Recent Courses</span>
                </div>
                
                <div className="space-y-1">
                  {courses.map((course) => (
                    <div
                      key={course.id}
                      className="group relative bg-white hover:bg-gray-50 rounded-lg transition-colors"
                    >
                      <button
                        className="w-full text-left px-4 py-2"
                      >
                        <div className="text-sm font-medium text-gray-800">{course.title}</div>
                        <div className="text-xs text-gray-500">{course.date}</div>
                        <div className="mt-1 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-indigo-600 rounded-full"
                            style={{ width: `${course.progress}%` }}
                          />
                        </div>
                      </button>
                      <button
                        onClick={() => handleDeleteCourse(course.id)}
                        className="absolute right-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 p-1 text-red-500 hover:text-red-700 transition-opacity"
                        title="Delete course"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
  
          <div className="absolute bottom-0 w-64 border-t border-gray-200">
            <div className="p-4 space-y-2">
              <button className="w-full flex items-center space-x-2 px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                <Settings className="w-5 h-5" />
                <span>Settings</span>
              </button>
              <button className="w-full flex items-center space-x-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                <LogOut className="w-5 h-5" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
  
        {/* Main Content */}
        <div className="flex-1 overflow-auto">
          <header className="bg-white border-b border-gray-200 p-4">
            <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
          </header>
  
          <main className="p-6">
            {isGenerating ? (
              <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-sm p-8 text-center">
                <div className="animate-spin w-12 h-12 mx-auto mb-4">
                  <BookOpen className="w-full h-full text-indigo-600" />
                </div>
                <h2 className="text-xl font-semibold text-gray-800 mb-2">
                  Generating Your Course...
                </h2>
                <p className="text-gray-600">
                  Our AI is crafting a personalized learning experience for you.
                </p>
              </div>
            ) : (
              <div className="max-w-2xl mx-auto space-y-6">
                <div className="bg-white rounded-xl shadow-sm p-8">
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">
                    Generate a New Course
                  </h2>
                  <p className="text-gray-600 mb-6">
                    Let our AI create a personalized learning path based on your interests and goals.
                  </p>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">
                        What would you like to learn?
                      </label>
                      <input
                      onChange={(e) => setTopic(e.target.value)}
                        type="text"
                        placeholder="e.g., Web Development, Machine Learning, Digital Marketing..."
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">
                        Your current skill level
                      </label>
                      <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500">
                        <option>Beginner</option>
                        <option>Intermediate</option>
                        <option>Advanced</option>
                      </select>
                    </div>
                    <button
                      onClick={handleGenerateCourse}
                      className="w-full flex items-center justify-center space-x-2 bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors"
                    >
                      <span>Generate Course</span>
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>
  
                <div className="bg-white rounded-xl shadow-sm p-8">
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">
                    Your Learning Stats
                  </h3>
                  <div className="grid grid-cols-3 gap-6">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-indigo-600 mb-1">
                        {courses.length}
                      </div>
                      <div className="text-sm text-gray-600">Total Courses</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-indigo-600 mb-1">
                        {courses.filter(c => c.progress > 0).length}
                      </div>
                      <div className="text-sm text-gray-600">In Progress</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-indigo-600 mb-1">
                        {courses.filter(c => c.progress === 100).length}
                      </div>
                      <div className="text-sm text-gray-600">Completed</div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>
    );
  }
  

export default Dashboard;
