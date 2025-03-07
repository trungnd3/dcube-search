import { TextContent } from "../../interface/document";

interface SearchResultItem {
  title: TextContent;
  excerpt: TextContent;
  uri: string;
}

export default function SearchResultItem({
  title, excerpt, uri
}: SearchResultItem) {

  return (
    <>
      <h2 className="text-primary semibold">{title.Text}</h2>
      <p className="regular-text">{excerpt.Text}</p>
      <a href={uri} className="regular-link cursor-pointer">{uri}</a>
    </>
  )
}
