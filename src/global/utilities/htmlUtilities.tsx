import { type JSX } from "react";

export const stripHtmlTags = (html: string | null | undefined): string => {
  if (!html) return "";
  const div = document.createElement("div");
  div.innerHTML = html;
  return div.textContent || div.innerText || "";
};


export const renderHtml = (html: string | null | undefined): JSX.Element => {
  if (!html) return <></>;
  return <div dangerouslySetInnerHTML={{ __html: html }} />;
};
