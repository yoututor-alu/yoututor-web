export const extractYouTubeVideoId = (
  url: string | null | undefined
): string | null => {
  if (!url || typeof url !== "string") {
    return null;
  }

  try {
    // Handle all YouTube URL variations
    let urlObj: URL;

    try {
      urlObj = new URL(url.trim());
    } catch (e) {
      // If URL parsing fails, try adding https:// prefix
      try {
        urlObj = new URL("https://" + url.trim());
      } catch (e2) {
        return null; // Not a valid URL
      }
    }

    // Normalize hostname - handle youtu.be, m.youtube.com, youtube.com, www.youtube.com, etc.
    const hostname: string = urlObj.hostname;
    if (!hostname.includes("youtube") && !hostname.includes("youtu.be")) {
      return null; // Not a YouTube URL
    }

    // Method 1: youtu.be short URLs (e.g., https://youtu.be/VIDEO_ID)
    if (hostname === "youtu.be" || hostname.includes("youtu.be")) {
      const pathname: string = urlObj.pathname;
      const videoId: string = pathname.slice(1).split("?")[0]; // Remove leading slash and any query params
      if (videoId && videoId.length >= 11) {
        return videoId;
      }
    }

    // Method 2: Standard watch URLs (e.g., https://www.youtube.com/watch?v=VIDEO_ID)
    const searchParams: URLSearchParams = urlObj.searchParams;
    if (searchParams.has("v")) {
      const videoId: string | null = searchParams.get("v");
      if (videoId && videoId.length >= 11) {
        return videoId;
      }
    }

    // Method 3: Embed URLs (e.g., https://www.youtube.com/embed/VIDEO_ID)
    const pathSegments: string[] = urlObj.pathname.split("/").filter(Boolean);
    if (pathSegments.includes("embed")) {
      const embedIndex: number = pathSegments.indexOf("embed");
      if (embedIndex !== -1 && embedIndex + 1 < pathSegments.length) {
        const videoId: string = pathSegments[embedIndex + 1].split("?")[0];
        if (videoId && videoId.length >= 11) {
          return videoId;
        }
      }
    }

    // Method 4: /v/ format (e.g., https://www.youtube.com/v/VIDEO_ID)
    if (pathSegments.includes("v")) {
      const vIndex: number = pathSegments.indexOf("v");
      if (vIndex !== -1 && vIndex + 1 < pathSegments.length) {
        const videoId: string = pathSegments[vIndex + 1].split("?")[0];
        if (videoId && videoId.length >= 11) {
          return videoId;
        }
      }
    }

    // Method 5: Mobile URLs (e.g., https://m.youtube.com/watch?v=VIDEO_ID)
    // This is already handled by Method 2 (watch?v=), but included for completeness

    // Method 6: Shorts URLs (e.g., https://www.youtube.com/shorts/VIDEO_ID)
    if (pathSegments.includes("shorts")) {
      const shortsIndex: number = pathSegments.indexOf("shorts");
      if (shortsIndex !== -1 && shortsIndex + 1 < pathSegments.length) {
        const videoId: string = pathSegments[shortsIndex + 1].split("?")[0];
        if (videoId && videoId.length >= 11) {
          return videoId;
        }
      }
    }

    return null; // No video ID found
  } catch (error) {
    return null;
  }
};
