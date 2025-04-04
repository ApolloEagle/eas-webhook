export const slackRequest = async (payload, slackUrl) => {
  const { blocks } = payload;

  try {
    await fetch(slackUrl, {
      body: JSON.stringify({ blocks }),
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error posting slack message: ", error);
  }
};
