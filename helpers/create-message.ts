import {
  ResponseBody,
  Block,
  HeaderBlock,
  SectionBlock,
  ActionsBlock,
} from "../types/types";
import { Platform } from "../types/enums";

export const createMessage = (
  text: string,
  body: ResponseBody,
  showQR: boolean
): { blocks: Block[] } => {
  const { platform, metadata, artifacts, buildDetailsPageUrl, appId, id } =
    body;

  const { buildProfile, appVersion, appBuildVersion } = metadata;
  const { buildUrl } = artifacts;

  const url =
    appId && id && platform === Platform.iOS
      ? `itms-services://?action=download-manifest;url=https://exp.host/--/api/v2/projects/${appId}/builds/${id}/manifest.plist`
      : buildUrl;

  const actionText: string =
    platform === Platform.iOS ? "Download IPA" : "Download APK";

  const headerBlock: HeaderBlock = {
    type: "header",
    text: {
      type: "plain_text",
      text,
    },
  };

  const sectionBlock: SectionBlock = {
    type: "section",
    fields: [
      {
        type: "mrkdwn",
        text: `*Build Profile*: ${buildProfile}\n*Version:* ${appVersion}\n*Build*: ${appBuildVersion}`,
      },
    ],
  };

  const actionsBlock: ActionsBlock = {
    type: "actions",
    elements: [
      {
        type: "button",
        text: {
          type: "plain_text",
          text: actionText,
        },
        url,
      },
      {
        type: "button",
        text: {
          type: "plain_text",
          text: "Open Build Details Page",
        },
        url: buildDetailsPageUrl,
      },
    ],
  };

  const blocks: Block[] = [headerBlock, sectionBlock, actionsBlock];

  if (showQR && url) {
    blocks.push({
      type: "image",
      image_url: `https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(
        url
      )}&size=250x250&qzone=2`,
      alt_text: "qr",
    });
  }

  return { blocks };
};
