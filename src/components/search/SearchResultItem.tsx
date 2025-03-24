import { TextContent } from '../../interface/document';
import Highlighter from 'react-highlight-words';

interface SearchResultItem {
  searchTerms: string[];
  title: TextContent;
  excerpt: TextContent;
  uri: string;
}

export default function SearchResultItem({
  searchTerms,
  title,
  excerpt,
  uri,
}: SearchResultItem) {
  return (
    <>
      <a href={uri} className='text-primary semibold'>
        <h2>
          <Highlighter
            highlightClassName='text-primary font-extrabold bg-white'
            activeClassName='font-extrabold'
            searchWords={searchTerms}
            autoEscape={true}
            textToHighlight={title.Text}
          />
        </h2>
      </a>
      <p>
        <Highlighter
          highlightClassName=' font-bold bg-white leading-6'
          activeClassName='font-extrabold'
          searchWords={searchTerms}
          autoEscape={true}
          textToHighlight={excerpt.Text}
        />
      </p>
      <a href={uri} className='regular-link cursor-pointer'>
        {uri}
      </a>
    </>
  );
}
