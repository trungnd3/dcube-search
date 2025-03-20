import { render, screen } from '@testing-library/react';
import { documents } from '../../../tests/mock';
import { useRequest } from '../../hooks/use-request';
import { DocumentResult } from '../../interface/document';
import { BrowserRouter } from 'react-router-dom';
import SearchResult from './SearchResult';

vi.mock('../../hooks/use-request');

const useRequestClient = vi.mocked(useRequest);

describe('SearchResult', () => {
  const returnValue = {
    request: vi.fn().mockImplementation(
      async (
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        _endpoint: string,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        _onSuccess?: (data: DocumentResult) => void
      ) => {}
    ),
    response: {
      data: documents,
      error: '',
      loading: false,
    },
  };

  it('renders SearchResult component', () => {
    useRequestClient.mockReturnValue(returnValue);
    render(
      <BrowserRouter>
        <SearchResult searchKey='child' />
      </BrowserRouter>
    );

    expect(screen.queryByTestId('search-result')).toBeInTheDocument();
  });

  it('does not render SearchResult component', () => {
    returnValue.response.data.ResultItems = []
    useRequestClient.mockReturnValue(returnValue);
    render(
      <BrowserRouter>
        <SearchResult searchKey='child' />
      </BrowserRouter>
    );

    expect(screen.queryByTestId('search-result')).not.toBeInTheDocument();
  });

  it('renders no result', () => {
    returnValue.response.error = 'Error happened'
    useRequestClient.mockReturnValue(returnValue);
    render(
      <BrowserRouter>
        <SearchResult searchKey='child' />
      </BrowserRouter>
    );

    expect(screen.queryByTestId('search-result')).not.toBeInTheDocument();
    expect(screen.queryByText('No result.')).toBeInTheDocument();
  });
});
