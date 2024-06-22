import { getProjects } from "./main.ts";

if (import.meta.main) {
  Deno.serve(async (request) => {
    const url = new URL(request.url);
    const projectID = url.pathname.split("/")[1];
    if (!projectID) {
      return new Response("Project ID is required", { status: 400 });
    }

    return Response.json(await getProjects(projectID));
  });
}
