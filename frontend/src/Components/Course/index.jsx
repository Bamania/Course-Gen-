import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { BookOpen, Clock, Award, ChevronRight, PlayCircle, CheckCircle2 } from 'lucide-react';
import axios from 'axios';
import { SaveCourse } from '../../Slices/course.slice';
import { useNavigate } from 'react-router-dom';

function CourseData() {
   
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const CourseStorage = useSelector((state) => state.COURSE_STORAGE);
    const TitleStorage = useSelector((state) => state.TITLE_STORAGE);
    const title = TitleStorage.selectedTitle;
    const backend_url = "http://localhost:5000/course";

 
    const handleGenerateCourse = async () => {
        setLoading(true);
        try {
            const headers = {
                'Content-Type': 'application/json',
            };
            const response = await axios.get(backend_url, {
                params: { title: title },
                headers,
            });
            console.log("Response received:", response.data);
             dispatch(SaveCourse(response.data.result));
            console.log("Course saved, navigating to /display");
            navigate("/display");
        } catch (error) {
            console.error("Error fetching course data:", error);
        } finally {
            setLoading(false);
        }
    };
    

    const courseData = {
        title: "Advanced Machine Learning with Python",
        description: "Master the fundamentals and advanced concepts of Machine Learning using Python. This comprehensive course covers everything from basic algorithms to deep learning.",
        duration: "12 hours",
        totalModules: 8,
        level: "Intermediate",
        instructor: "AI Instructor",
        progress: 35,
        modules: [
            {
                id: 1,
                title: "Introduction to Machine Learning",
                duration: "1.5 hours",
                completed: true,
                lessons: [
                    "What is Machine Learning?",
                    "Types of Machine Learning",
                    "Setting up your Environment"
                ]
            },
            {
                id: 2,
                title: "Supervised Learning Algorithms",
                duration: "2 hours",
                completed: false,
                lessons: [
                    "Linear Regression",
                    "Logistic Regression",
                    "Decision Trees"
                ]
            },
            {
                id: 3,
                title: "Unsupervised Learning",
                duration: "2 hours",
                completed: false,
                lessons: [
                    "Clustering Algorithms",
                    "Dimensionality Reduction",
                    "Principal Component Analysis"
                ]
            }
        ]
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
                <div className="container mx-auto px-4 py-12">
                    <div className="max-w-4xl">
                        <h1 className="text-4xl font-bold mb-4">{courseData.title}</h1>
                        <p className="text-lg mb-6 text-blue-100">{courseData.description}</p>
                        <div className="flex flex-wrap gap-6 text-sm">
                            <div className="flex items-center">
                                <Clock className="w-5 h-5 mr-2" />
                                {courseData.duration}
                            </div>
                            <div className="flex items-center">
                                <BookOpen className="w-5 h-5 mr-2" />
                                {courseData.totalModules} modules
                            </div>
                            <div className="flex items-center">
                                <Award className="w-5 h-5 mr-2" />
                                {courseData.level}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Course Progress */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
                            <h2 className="text-2xl font-semibold mb-4">Course Progress</h2>
                            <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
                                <div 
                                    className="bg-blue-600 h-2.5 rounded-full" 
                                    style={{ width: `${courseData.progress}%` }}
                                ></div>
                            </div>
                            <p className="text-gray-600">{courseData.progress}% Complete</p>
                        </div>

                        {/* Course Modules */}
                        <div className="space-y-4">
                            {courseData.modules.map((module) => (
                                <div key={module.id} className="bg-white rounded-xl shadow-sm p-6">
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="flex items-center">
                                            {module.completed ? (
                                                <CheckCircle2 className="w-6 h-6 text-green-500 mr-3" />
                                            ) : (
                                                <PlayCircle className="w-6 h-6 text-blue-500 mr-3" />
                                            )}
                                            <h3 className="text-xl font-semibold">{module.title}</h3>
                                        </div>
                                        <span className="text-gray-500 text-sm">{module.duration}</span>
                                    </div>
                                    <ul className="space-y-3 ml-9">
                                        {module.lessons.map((lesson, index) => (
                                            <li key={index} className="flex items-center text-gray-700">
                                                <ChevronRight className="w-4 h-4 mr-2 text-gray-400" />
                                                {lesson}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-xl shadow-sm p-6 sticky top-4">
                            <div className="text-center mb-6">
                                <img
                                    src="https://images.unsplash.com/photo-1531482615713-2afd69097998?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
                                    alt="Course thumbnail"
                                    className="w-full h-48 object-cover rounded-lg mb-4"
                                />
                                <h4 className="font-semibold">Your Instructor</h4>
                                <p className="text-gray-600">{courseData.instructor}</p>
                            </div>
                            <button onClick={handleGenerateCourse}className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors">
                            Generate the course
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CourseData;