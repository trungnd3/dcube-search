import { TextContent } from "../../interface/document";
import HighlightedText from "../ui/HighlightedText";

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
      <HighlightedText paragraph={title} className='text-primary semibold' tag="h2" />
      <HighlightedText paragraph={excerpt} className='regular-text' />
      <a href={uri} className="regular-link cursor-pointer">{uri}</a>
    </>
  )
}
