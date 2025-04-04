export const createMessage = (text, body, showQR) => {
  const { platform, metadata, artifacts, buildDetailsPageUrl, appId, id } =
    body;

  const { buildProfile, appVersion, appBuildVersion } = metadata;
  const { buildUrl } = artifacts;

  const url =
    appId && id && platform === "ios"
      ? `itms-services://?action=download-manifest;url=https://exp.host/--/api/v2/projects/${appId}/builds/${id}/manifest.plist`
      : buildUrl;

  const actionText = platform === "ios" ? "Download IPA" : "Download APK";

  const headerBlock = {
    type: "header",
    text: {
      type: "plain_text",
      text,
    },
  };

  const sectionBlock = {
    type: "section",
    fields: [
      {
        type: "mrkdwn",
        text: `*Build Profile*: ${buildProfile}\n*Version:* ${appVersion}\n*Build*: ${appBuildVersion}`,
      },
    ],
  };

  const actionsBlock = {
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

  const blocks = [headerBlock, sectionBlock, actionsBlock];

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
