import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { BookOpen, Clock, Award, ChevronRight, PlayCircle, CheckCircle2 } from 'lucide-react';
import axios from 'axios';
import { SaveCourse ,Savechapter,Saveresources,Saveassignments,Savedescriptions} from '../../Slices/course.slice';
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
                params: { selectedTitle: title },
                headers,
            });
            console.log("Response received:", response.data);
            console.log(response.data.result);
            console.log(response.data.result.result);
            // console.log(response.data.result.result.result);
            console.log(response.data.result.result.chapters);
            dispatch(Savechapter(response.data.result.result.chapters));
            dispatch(Saveresources(response.data.result.result.Resources));
            dispatch(Savedescriptions(response.data.result.result.Description));
            dispatch(Saveassignments(response.data.result.result.Assignment));
        
          
            navigate("/display")
            // console.log("Response received:", response.data);
           
            
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
          
    );
}

export default CourseData;