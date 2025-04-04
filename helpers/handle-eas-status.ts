import { ResponseBody } from "../types/types";
import { Status, Platform } from "../types/enums";
import { createMessage } from "./create-message";

export const handleEASStatus = (body: ResponseBody) => {
  const { platform, status } = body;

  switch (status) {
    case Status.Finished:
      if (platform === Platform.iOS) {
        const text: string = "Build completed successfully for iOS";
        return createMessage(text, body, true);
      } else {
        const text: string = "Build completed successfully for Android";
        return createMessage(text, body, true);
      }

    case Status.Error:
      if (platform === Platform.iOS) {
        const text: string = "Build failed for iOS";
        return createMessage(text, body, false);
      } else {
        const text: string = "Build failed for Android";
        return createMessage(text, body, false);
      }

    case Status.Canceled:
      const platformCanceled: string =
        platform === Platform.iOS ? "iOS" : "Android";

      const text: string = `Build was canceled for ${platformCanceled}`;
      return createMessage(text, body, false);

    default:
      break;
  }
};
