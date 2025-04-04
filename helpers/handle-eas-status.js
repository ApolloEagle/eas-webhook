import { createMessage } from "./create-message.js";

export const handleEASStatus = (body) => {
  const { platform, status } = body;

  switch (status) {
    case "finished":
      if (platform === "ios") {
        const text = "Build completed successfully for iOS";
        return createMessage(text, body, true);
      } else {
        const text = "Build completed successfully for Android";
        return createMessage(text, body, true);
      }

    case "errored":
      if (platform === "ios") {
        const text = "Build failed for iOS";
        return createMessage(text, body, false);
      } else {
        const text = "Build failed for Android";
        return createMessage(text, body, false);
      }

    case "canceled":
      const platformCanceled = platform === "ios" ? "iOS" : "Android";

      const text = `Build was canceled for ${platformCanceled}`;
      return createMessage(text, body, false);

    default:
      break;
  }
};
