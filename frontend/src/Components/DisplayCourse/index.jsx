import React from 'react';
import { BookOpen, Clock, Globe, GraduationCap, Star, Users } from 'lucide-react';
import { useSelector } from 'react-redux';

function DisplayCourse() {
const CourseContent=useSelector((state)=>state.COURSE_STORAGE)

console.log("Course Content", CourseContent.aiGeneratedCourse);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-[300px]">
        <img 
          src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80"
          alt="Course banner"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 flex items-center">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Advanced Web Development
            </h1>
            <p className="text-xl text-gray-200 max-w-2xl">
              Master modern web technologies and build professional applications
            </p>
          </div>
        </div>
      </div>

      {/* Course Info */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="md:col-span-2">
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <h2 className="text-2xl font-bold mb-4">About This Course</h2>
              <p className="text-gray-600 mb-6">
                This comprehensive course covers everything you need to know about modern web development.
                From frontend frameworks to backend architecture, you'll learn the skills needed to build
                professional, scalable web applications.
              </p>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-blue-600" />
                  <span>12 weeks</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-blue-600" />
                  <span>2,500+ students</span>
                </div>
                <div className="flex items-center gap-2">
                  <Globe className="w-5 h-5 text-blue-600" />
                  <span>100% online</span>
                </div>
              </div>
            </div>

            {/* Curriculum */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-2xl font-bold mb-6">Curriculum</h2>
              <div className="space-y-4">
                {[
                  "Introduction to Web Development",
                  "HTML5 & CSS3 Fundamentals",
                  "JavaScript Programming",
                  "React.js Framework",
                  "Backend Development with Node.js",
                  "Database Design & Implementation",
                  "API Development",
                  "Deployment & DevOps",
                ].map((module, index) => (
                  <div key={index} className="flex items-center gap-3 p-4 border rounded-lg hover:bg-gray-50">
                    <BookOpen className="w-5 h-5 text-blue-600" />
                    <span className="font-medium">Module {index + 1}: {module}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="md:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-4">
              <div className="text-center mb-6">
                <h3 className="text-3xl font-bold text-blue-600">$499</h3>
                <p className="text-gray-500">One-time payment</p>
              </div>

              <button className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 transition-colors mb-4">
                Enroll Now
              </button>

              <div className="space-y-4 text-sm">
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-yellow-400" />
                  <span>4.9/5 course rating</span>
                </div>
                <div className="flex items-center gap-2">
                  <GraduationCap className="w-4 h-4 text-gray-600" />
                  <span>Certificate of completion</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DisplayCourse;