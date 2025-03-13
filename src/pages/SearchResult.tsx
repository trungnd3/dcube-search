import { useSearchParams } from 'react-router';
import Layout from '../components/layout/Layout';
import SearchResult from '../components/search/SearchResult';

export default function SearchResultPage() {
  const [searchParams] = useSearchParams();

  const key = searchParams.get('key') || '';
  return (
    <Layout>
      <div data-testid='search-result-page'>
        <SearchResult searchKey={key} />
      </div>
    </Layout>
  );
}
