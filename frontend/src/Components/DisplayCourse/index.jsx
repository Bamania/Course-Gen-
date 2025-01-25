import React from 'react';
import { BookOpen, Clock, Globe, GraduationCap, Star, Users } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { Saveassignments, Savechapter, Savedescriptions, Saveresources } from '../../Slices/course.slice';

function DisplayCourse() {
  const CourseContent = useSelector((state) => state.COURSE_STORAGE);

  console.log("Course Content", CourseContent);
  const dispatch = useDispatch();

  function parseCourseData(input) {
    if (!input || typeof input !== 'string') {
      return {
        courseTitle: [],
        courseDescription: [],
        chapters: [],
        descriptions: [],
        resources: [],
        assignments: []
      };
    }

    // Extract the relevant part of the string
    const dataPart = input.split("{'result': '");
    if (dataPart.length < 2) {
      return {
        courseTitle: [],
        courseDescription: [],
        chapters: [],
        descriptions: [],
        resources: [],
        assignments: []
      };
    }
    const data = dataPart[1].split("'}")[0];

    // Split the data into lines
    const lines = data.split('\n');

    // Initialize arrays
    const courseTitle = [];
    const courseDescription = [];
    const chapters = [];
    const descriptions = [];
    const resources = [];
    const assignments = [];

    // Extract course title and description (first two sentences)
    const sentences = data.match(/[^.!?]+[.!?]+/g);
    if (sentences && sentences.length >= 2) {
      courseTitle.push(sentences[0].trim());
      courseDescription.push(sentences[1].trim());
    }

    // Process each chapter
    const chapterSections = data.split('---');
    chapterSections.forEach(section => {
      if (section.includes('*Chapter')) {
        // Extract chapter title
        const chapterTitleMatch = section.match(/\*Chapter \d+: (.+)/);
        const chapterTitle = chapterTitleMatch ? chapterTitleMatch[1] : 'Untitled Chapter';
        chapters.push(chapterTitle);

        // Extract chapter description
        const chapterDescriptionMatch = section.match(/\*Description: (.+)/);
        const chapterDescription = chapterDescriptionMatch ? chapterDescriptionMatch[1] : 'No description available';
        descriptions.push(chapterDescription);

        // Extract resources
        const resourceLines = section.split('*Resources:')[1]?.split('*Assignment:')[0]?.trim() || 'No resources available';
        resources.push(resourceLines);

        // Extract assignment
        const assignment = section.split('*Assignment:')[1]?.split('---')[0]?.trim() || 'No assignment available';
        assignments.push(assignment);
      }
    });

    return {
      courseTitle,
      courseDescription,
      chapters,
      descriptions,
      resources,
      assignments
    };
  }

  // Sample input

  // Parse the input
  const result = parseCourseData(CourseContent[2]);
  dispatch(Savechapter(result.chapters));
  dispatch(Savedescriptions(result.descriptions));
  dispatch(Saveresources(result.resources));
  dispatch(Saveassignments(result.assignments));

  console.log("after dispatch state !", CourseContent);


  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-[300px]">
      {CourseContent.ParsedChapters((item,index) => {
        return (
          <div key={index} className="border-b border-gray-200 py-4">
            <div className="flex items-center gap-4">
              <div>
              <h1>Chapters</h1>
              <span>{item}</span>
              </div>
              <div>
              <h3>
                descriptions
              </h3>
              <span>{CourseContent.ParsedDescriptions[index]}</span>
              </div>
              <div>
              <h3>
                resources link
              </h3>
              <span>{CourseContent.ParsedResources[index]}</span>
              </div>
<div>
              <h4>
                asssignments
              </h4>
              <span>{CourseContent.ParsedAssignments[index]}</span>
              </div>
            </div>
          </div>
        )
      })}
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