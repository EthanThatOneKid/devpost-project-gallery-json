import { DOMParser } from "deno_dom";

if (import.meta.main) {
  const projectID = Deno.args[0];
  const html = await fetch(`https://${projectID}.devpost.com/project-gallery`)
    .then((response) => response.text());
  const document = new DOMParser().parseFromString(html, "text/html");
  const links = [...document.querySelectorAll(".link-to-software")].map((
    node,
  ) => {
    const url = node.getAttribute("href");
    const img = node.querySelector("img");
    const title = img.getAttribute("alt");
    const imageURL = img.getAttribute("src");
    return { title, url, imageURL };
  });

  console.log(JSON.stringify(links, null, 2));
}
