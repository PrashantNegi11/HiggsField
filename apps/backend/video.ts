export async function createVideo(
    prompt: string,
    imageUrl: string
  ) {
    const response = await fetch(
      "https://api.free.ai/v1/video/generate/",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.IMAGE_TO_VIDEO_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "cogvideox-2b",
          prompt,
          image_url: imageUrl,
          duration: 5,
          aspect_ratio: "16:9",
        }),
      }
    );
  
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Video generation failed: ${response.status} ${errorText}`
      );
    }
  
    return await response.json();
  }