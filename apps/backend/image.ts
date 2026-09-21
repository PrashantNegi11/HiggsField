import * as fs from "node:fs";
import path from "node:path";

export async function createImage(userPrompt: string){
    const response = await fetch(
        "https://image-api.gandusharma6969-cloudflare.workers.dev/",
        {
            method: "POST",
            headers: {
            Authorization: `Bearer ${process.env.GOOGLE_API_KEY}`,
            "Content-Type": "application/json",
            },
            body: JSON.stringify({
            prompt: userPrompt ,
            }),
        }
    );
        // If Cloudflare Worker returns an error
    if (!response.ok) {
    const errorText = await response.text();

    console.log("Worker status:", response.status);
    console.log("Worker response:", errorText);

    throw new Error(`Worker returned ${response.status}: ${errorText}`);

    }
    
    // Get image bytes
    const imageBuffer = await response.arrayBuffer();

    const buffer = Buffer.from(imageBuffer);

    const fileName = `avatar-${Date.now()}.png`;

    const assetsPath = path.join(process.cwd(), "assets");

    if (!fs.existsSync(assetsPath)) {
        fs.mkdirSync(assetsPath, { recursive: true });
    }

    const filePath = path.join(assetsPath, fileName);

    fs.writeFileSync(filePath, buffer);

    console.log("Image saved at:", filePath);

    return buffer;
}