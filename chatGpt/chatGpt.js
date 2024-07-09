async function getSummary(reviews){
const {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
  } = require("@google/generative-ai");
  
  const apiKey = process.env.GEMINI_API_KEY;
  const genAI = new GoogleGenerativeAI(apiKey);
  
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    systemInstruction: "i will give a bunch of reviews sumarize them and remove any foul language and give it to me okay. If there are no enough reviews just give me Not enough reviews to summarize response",
  });
  
  const generationConfig = {
    temperature: 1.5,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
  };
  
  async function run() {
    const chatSession = model.startChat({
      generationConfig,
      history: [
      ],
    });
  
    const result = await chatSession.sendMessage(reviews);
return result.response.text()
  }
  
 let summary =await run();
 return summary;

}

module.exports={getSummary};