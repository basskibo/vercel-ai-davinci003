import { Configuration, OpenAIApi } from "openai-edge";
import { OpenAIStream, StreamingTextResponse } from "ai";

// Create an OpenAI API client (that's edge friendly!)
const config = new Configuration({
	apiKey: process.env.OPENAI_API_KEY
})

const openai = new OpenAIApi(config)

// IMPORTANT! Set the runtime to edge
export const runtime = 'edge'

export async function POST(req: Request) {
	const { prompt } = await req.json()
	console.log(prompt)

	// Ask OpenAI for a streaming completion given the prompt
	const response = await openai.createCompletion({
		model: 'text-davinci-003',
		stream: true,
		temperature: 1,
		prompt: `Create three catchy names for application with unique features.
 
		Application: Bookstore with cats
		Names: Purr-fect Pages, Books and Whiskers, Novels and Nuzzles
		Application: Gym with rock climbing
		Names: Peak Performance, Reach New Heights, Climb Your Way Fit
		Application: ${prompt}
		Names:`,
	})

	// Convert the response into a friendly text-stream
	const stream = OpenAIStream(response);
	console.log(stream)
	// Respond with the stream
	return new StreamingTextResponse(stream);
}