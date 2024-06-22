import { DOMParser } from "deno_dom";

export function getProjects(projectID: string) {
  return fetch(`https://${projectID}.devpost.com/project-gallery`)
    .then((response) => response.text())
    .then((html) => {
      const document = new DOMParser().parseFromString(html, "text/html");
      return Array.from(
        document.querySelectorAll(".link-to-software"),
        (node) => {
          const url = node.getAttribute("href");
          const img = node.querySelector("img");
          const title = img.getAttribute("alt");
          const imageURL = img.getAttribute("src");
          return { title, url, imageURL };
        },
      );
    });
}

if (import.meta.main) {
  const projectID = Deno.args[0];
  const data = await getProjects(projectID);
  console.log(JSON.stringify(data, null, 2));
}
