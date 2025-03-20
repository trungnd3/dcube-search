import { render, screen } from '@testing-library/react';
import SearchResult from './SearchResult';
import { BrowserRouter } from 'react-router-dom';

describe('SearchResult', () => {
  it('renders the SearchResult component', () => {
    render(
      <BrowserRouter>
        <SearchResult />
      </BrowserRouter>
    );

    expect(screen.queryByTestId('search-result-page')).toBeInTheDocument();
  });
});
