import { useSearchParams } from 'react-router';
import Layout from '../components/layout/Layout';
import SearchResult from '../components/search/SearchResult';

export default function SearchResultPage() {
  const [searchParams] = useSearchParams();

  const key = searchParams.get('key') || '';
  return <Layout>
    <SearchResult searchKey={key} />
  </Layout>;
}
