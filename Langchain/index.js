import { config } from "dotenv";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { PromptTemplate } from "@langchain/core/prompts";

config();

const model = new ChatGoogleGenerativeAI({
  temperature: 0.7,
  model: "gemini-2.0-flash",
  apiKey: process.env.GEMINI_API_KEY,
});

const promptTemplate = PromptTemplate.fromTemplate(`
    
    Tell me a joke about {topic}.
    
    `);




// Create a chain by piping the prompt template into the model
const chain = promptTemplate.pipe(model);
chain.invoke({ topic: "dogs" }).then((response) => {
  console.log("Joke about dogs:", response);
});




// Alternatively, you can directly pipe the prompt template and invoke it
promptTemplate.pipe(model).invoke({ topic: "cats" }).then(response => {
  console.log("Joke about cats:", response);
});



// Or directly invoke the prompt template with the model
promptTemplate.invoke({ topic: "computers" }).then(response => {
  console.log("Joke about computers:", response.value);
});



// Directly invoke the model with a simple question
 model.invoke("who are you?").then(response => {
   console.log("Response from Google Gemini:", response.content);
 }).catch(error => {
   console.error("Error invoking Google Gemini model:", error);
 });
