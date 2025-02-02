import React from 'react';
import { BookOpen, Clock, Globe, GraduationCap, Star, Users, Video, FileText, PenTool } from 'lucide-react';
import { useSelector } from 'react-redux';

function DisplayCourse() {
  const CourseContent = useSelector((state) => state.COURSE_STORAGE);
  console.log("chapters", CourseContent.ParsedChapters);
  console.log("Descriptions:", CourseContent.ParsedDescriptions);
console.log("Resources:", CourseContent.ParsedResources);
console.log("Assignments:", CourseContent.ParsedAssignments);
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">Web Development Masterclass</h1>
          <p className="text-xl opacity-90">Master modern web development from ground up</p>
        </div>
      </div>

      {/* Course Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="md:col-span-2">
            <h2 className="text-2xl font-bold mb-6">Course Content</h2>

            {CourseContent.ParsedChapters[0].map((chapter, index) => (
              <div key={index} className="bg-white rounded-lg shadow-sm mb-6 overflow-hidden">
                {/* Chapter Header */}
                <div className="border-b border-gray-100 bg-blue-50 p-4">
                  <div className="flex items-center gap-3">
                    <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-semibold">
                      {index + 1}
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800">{chapter}</h3>
                  </div>
                </div>

                {/* Chapter Content */}
                <div className="p-6 space-y-6">
                  {/* Description */}
                  <div>
                    <h4 className="text-sm font-semibold text-gray-500 uppercase mb-2">Description</h4>
                    <p className="text-gray-700"><p className="text-gray-700">{CourseContent.ParsedDescriptions[0][index]}</p></p>
                    {/* <p className="text-gray-700">{CourseContent.ParsedDescriptions[0].length}</p> */}
                  </div>

                  {/* Resources */}
                  <div>
                    <h4 className="text-sm font-semibold text-gray-500 uppercase mb-3">Learning Resources</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {CourseContent.ParsedResources[index]?.map((resource, resIndex) => (
                        <div key={resIndex} className="flex items-center gap-2 text-blue-600 hover:text-blue-700">
                          {resource.type === 'video' ? <Video className="w-5 h-5" /> : <FileText className="w-5 h-5" />}
                          <a href={resource.link} target="_blank" rel="noopener noreferrer" className="text-sm">
                            {resource.title}
                          </a>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Assignment */}
                  <div>
                    <h4 className="text-sm font-semibold text-gray-500 uppercase mb-2">Assignment</h4>
                    <div className="flex items-start gap-3 bg-gray-50 p-4 rounded-lg">
                      <PenTool className="w-5 h-5 text-blue-600 mt-1" />
                      <div>
                        <p className="text-gray-700">{CourseContent.ParsedAssignments[0][index]}</p>
                        <button className="mt-2 text-sm text-blue-600 hover:text-blue-700 font-medium">
                          Start Assignment →
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Sidebar */}
          <div className="md:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-4">
              <div className="text-center mb-6">
                <h3 className="text-3xl font-bold text-blue-600">$499</h3>
                <p className="text-gray-500">One-time payment</p>
              </div>

              <button className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 transition-colors mb-6">
                Enroll Now
              </button>

              <div className="space-y-4">
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <Clock className="w-5 h-5 text-blue-600" />
                  <div>
                    <h4 className="font-medium">Course Duration</h4>
                    <p className="text-sm text-gray-600">12 weeks</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <Users className="w-5 h-5 text-blue-600" />
                  <div>
                    <h4 className="font-medium">Enrolled Students</h4>
                    <p className="text-sm text-gray-600">2,500+ students</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <Star className="w-5 h-5 text-yellow-400" />
                  <div>
                    <h4 className="font-medium">Course Rating</h4>
                    <p className="text-sm text-gray-600">4.9/5 from 500+ reviews</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  
                {/* {CourseContent.ParsedDescriptions[0].map((description, index) => (
      <div key={index} className="hidden md:block bg-gray-200 py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-6">Course Description</h2>
          <p className="text-gray-700">{description}</p>
        </div>
      </div>
    ))} */}
                  <div>
                    <h4 className="font-medium">Certificate</h4>
                    <p className="text-sm text-gray-600">Certificate of completion</p>
                  </div>
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
