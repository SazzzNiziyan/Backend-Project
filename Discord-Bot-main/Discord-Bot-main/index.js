require("dotenv").config();
const { Client, GatewayIntentBits , AttachmentBuilder } = require("discord.js")
const {GoogleGenAI} = require("@google/genai");

const client = new Client({
    intents:[
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
})
const ai = new GoogleGenAI({
    apiKey: process.env.GOOGLE_API_KEY
});
const IMAGE_MODEL = "gemini-2.5-flash-image";

async function generateImage(prompt){
    const response = await ai.models.generateContent({
        model: IMAGE_MODEL,
        contents : prompt,
        config: {
            responseModalities: ["TEXT", "IMAGE"]
        }
    });

for (const part of response.candidates[0].content.parts) {
    if (part.text) {
      console.log(part.text);
    } else if (part.inlineData) {
      const imageData = part.inlineData.data;
      const buffer = Buffer.from(imageData, "base64");
      return buffer;
    }
    }

    return null;
}


client.once("ready", () =>{
    console.log("Bot is ready!");
})

client.on("messageCreate", async(message) =>{

    const isBot = message.author.bot;

    if(isBot) return;

    try {
        const imageBuffer = await generateImage(message.content);

        if (imageBuffer) {
            const attachment = new AttachmentBuilder(imageBuffer, { filename: 'generated_image.png' });
            await message.reply({ files: [attachment] });
        } else {
            await message.reply("I couldn't generate an image for that prompt.");
        }
    } catch (error) {
        console.error("Image generation failed:", error);
        await message.reply("Something went wrong while generating the image.");
    }
})

client.login(process.env.DISCORD_BOT_TOKEN);