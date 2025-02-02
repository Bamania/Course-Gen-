// server.js
import express, { response } from "express";
import { Mistral } from '@mistralai/mistralai';
import cors from "cors";


const app = express();
const port = 5000;
// Enable CORS

const apiKey = "q5BYnQbXekX5O10x53NDYfkbJO0nx9mU";
const client = new Mistral({ apiKey: apiKey });

app.use(
  cors({
    origin: "http://localhost:3000", // Replace with your frontend URL
    methods: ["GET", "POST", "PUT", "DELETE"], // Allowed HTTP methods
    credentials: true, // Allow cookies or other credentials
  })
);


app.use(express.json());

async function genTitle(title) {
  try {
    const chatResponse = await client.chat.complete({
      model: "mistral-large-latest",
      messages: [
        {
          role: "user",
          content: `Generate me 5 titles for ${title} in the following JSON format: 
          { "titles": ["title1", "title2", "title3", "title4", "title5"] }`,
        },
      ],
      responseFormat: { type: "json_object" }
    });

    const responseContent = chatResponse.choices?.[0].message.content;
    console.log("type of the response content",typeof(responseContent));
    console.log("from gen ai title", responseContent);
  
    return JSON.parse(responseContent); // Parse the response content
  } catch (error) {
    console.error("Error with Mistral API:", error);
    throw new Error("Mistral API request failed");
  }
}

app.get("/title", async (req, res) => {
  try {
    const title = req.query.title;
    console.log("title from the frontend for course:", title);
    
    if (!title) {
      return res.status(400).json({ success: false, error: "Missing title" });
    }
    
    
    const response  = await genTitle(title);
    console.log("data from genTitle function  ", response);
    console.log("type of response  ", typeof(response));
    
    res.json({ success: true, result: response });
  } catch (error) {
    console.error("Error running code:", error);
    res.status(500).json({ success: false, error: "Failed to execute code" });
  }
});
app.get("/course", async (req, res) => {
  async function genCourse(selectedTitle) {
    try {
      const chatResponse = await client.chat.complete({
        model: "mistral-large-latest",
        messages: [
          {
            role: "user",
            content: `Create a structured ${selectedTitle} learning path like a book with chapters. Each chapter should include:
  
    A brief topic description
    High-quality YouTube videos and in-depth articles
    Hands-on coding tasks to reinforce learning
  
  
    Example:
    Chapter 1: Introduction to AI & Machine Learning
    Description: What is AI & ML? Hands-on Implementation
    Resources: Links to relevant videos and articles
    Assignment: Implement a simple Linear Regression model in Python
    The response should cover fundamentals to real-world projects, providing a comprehensive, organized learning experience.
    and generate me the data in the JSON format:  { "result":{chapters:[],Description:[],Resources:[],Assignment::[]} }`,
          },
        ],
        responseFormat: { type: "json_object" }
      });
  
      const responseContent = chatResponse.choices?.[0].message.content;
      console.log("Raw response content:", responseContent);

      if (!responseContent) {
        throw new Error("Empty response content");
      }

      console.log("type of the response content", typeof(responseContent));
      console.log("from gen ai title", responseContent);
    
      return JSON.parse(responseContent); // Parse the response content
    } catch (error) {
      console.error("Error with Mistral API course gen:", error);
      throw new Error("Mistral API course gen failed");
    }
  }
  
  try {
    const SelectedTitle = req.query.selectedTitle;
    console.log("SelectedTitle from the frontend for course:", SelectedTitle);
    
    if (!SelectedTitle) {
      return res.status(400).json({ success: false, error: "Missing SelectedTitle " });
    }
    
    
    const response  = await genCourse(SelectedTitle);
    console.log("data from genCourse function  ", response);
    console.log("type of response  ", typeof(response));

    res.json({ success: true, result: response });
  } catch (error) {
    console.error("Error running code:", error);
    res.status(500).json({ success: false, error: "Failed to execute code" });
  }
});


// Authentication Routes
// app.use("/api/auth", router);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
