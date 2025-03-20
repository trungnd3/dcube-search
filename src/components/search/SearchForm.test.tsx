import { render, RenderResult, screen, waitFor } from '@testing-library/react';
import userEvent, { UserEvent } from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import SearchForm from './SearchForm';

const mockedUseNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const mod = await vi.importActual<typeof import('react-router-dom')>(
    'react-router-dom'
  );
  return {
    ...mod,
    useNavigate: () => mockedUseNavigate,
  };
});

describe('SearchForm', () => {
  let form: RenderResult;
  let user: UserEvent;

  beforeEach(() => {
    form = render(
      <BrowserRouter>
        <SearchForm />
      </BrowserRouter>
    );
    user = userEvent.setup();
  });

  it('renders the SearchForm component', () => {
    expect(screen.queryByTestId('search-form')).toBeInTheDocument();
  });

  it('navigates the page when submit', async () => {
    const input = form.queryByTestId('search-input') as HTMLInputElement;
    const submitBtn = form.queryByTestId('submit-button') as HTMLButtonElement;
    const searchInputValue = 'child';

    expect(input).toBeInTheDocument();

    await user.type(input, searchInputValue);

    await user.click(submitBtn);

    await waitFor(() =>
      expect(mockedUseNavigate).toBeCalledWith(
        `/search-result?key=${searchInputValue}`
      )
    );
  });

  it('display suggestion when input text', async () => {
    const input = form.queryByTestId('search-input') as HTMLInputElement;
    const searchInputValue = 'child';

    expect(input).toBeInTheDocument();

    await user.type(input, searchInputValue);

    const suggestion = screen.queryByTestId('search-suggestion');
    expect(suggestion).toBeInTheDocument();
    expect(suggestion?.querySelector('ul')).toBeInTheDocument();
  });

  it.skip('suggestion close when click outside', async () => {
    const input = form.queryByTestId('search-input') as HTMLInputElement;
    const searchInputValue = 'child';

    expect(input).toBeInTheDocument();

    await user.type(input, searchInputValue);

    expect(screen.queryByTestId('search-suggestion')).toBeInTheDocument();

    const suggestion = screen.queryByTestId('search-suggestion');
    expect(document.body.classList).toContain('overflow-hidden');

    const banner = document.body.querySelector('header div:nth-of-type(1)')!;
    await user.click(banner);

    await waitFor(() => {
      expect(document.body.classList).not.toContain('overflow-hidden');
      expect(suggestion?.querySelector('ul li')).not.toBeInTheDocument();
    });
  });

  it('clears input values and close suggestion', async () => {
    const input = form.queryByTestId('search-input') as HTMLInputElement;
    const searchInputValue = 'child';

    expect(input).toBeInTheDocument();

    await user.type(input, searchInputValue);

    const suggestion = screen.queryByTestId('search-suggestion');
    expect(suggestion?.querySelector('ul')).toBeInTheDocument();

    const dismissBtn = form.queryByTestId(
      'dismiss-button'
    ) as HTMLButtonElement;
    await user.click(dismissBtn);
    await waitFor(() => {
      expect(suggestion?.querySelector('ul li')).not.toBeInTheDocument();
    });
  });
});
