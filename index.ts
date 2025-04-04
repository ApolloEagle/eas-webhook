import { handleEASStatus } from "./helpers/handle-eas-status";
import { slackRequest } from "./slack-request";

export default {
  async fetch(request, env): Promise<Response> {
    try {
      if (request.method === "POST") {
        const body = await request.json();

        const payload = handleEASStatus(body);

        if (!payload) {
          return new Response(
            JSON.stringify({ error: "Internal Server Error" }),
            {
              status: 500,
              headers: { "Content-Type": "application/json" },
            }
          );
        }

        await slackRequest(payload, env.SLACK_WEBHOOK_URL);

        const processedData = {
          received: body,
          processed: "data processed successfully",
        };

        return new Response(JSON.stringify(processedData), {
          status: 200,
          headers: { "Content-Type": "application/json" },
        });
      } else {
        return new Response(
          JSON.stringify({ message: "GET request received" }),
          {
            status: 200,
            headers: { "Content-Type": "application/json" },
          }
        );
      }
    } catch (error) {
      console.error("Error processing request:", error);
      return new Response(JSON.stringify({ error: "Internal Server Error" }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }
  },
};
