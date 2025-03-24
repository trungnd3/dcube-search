import {
  act,
  render,
  RenderResult,
  screen,
  waitFor,
} from '@testing-library/react';
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
    const input = form.getByTestId('search-input') as HTMLInputElement;
    const searchInputValue = 'child';

    expect(input).toBeInTheDocument();

    await user.type(input, searchInputValue);

    const suggestion = screen.getByTestId('search-suggestion');
    expect(suggestion?.querySelector('ul')).toBeInTheDocument();
    await waitFor(async () => {
      const dismissBtn = form.getByTestId(
        'dismiss-button'
      ) as HTMLButtonElement;
      await user.click(dismissBtn);
      expect(input.value).toBe('');
      expect(input.matches(':focus')).toBe(true);
      expect(suggestion?.querySelector('ul li')).not.toBeInTheDocument();
    });
  });

  it('closes suggestions when clicking outside the form', async () => {
    const input = form.queryByTestId('search-input') as HTMLInputElement;
    const searchInputValue = 'child';
    await user.type(input, searchInputValue);

    // Spy on blur method
    const blurSpy = vi.spyOn(input, 'blur');

    // Simulate a click outside the form
    await user.click(document.body);

    // Expect state updates and DOM changes
    expect(document.body.classList.contains('overflow-hidden')).toBe(false);
    expect(blurSpy).toHaveBeenCalled();

    blurSpy.mockRestore();
  });

  it('does not close suggestions when clicking inside the form', async () => {
    const input = form.queryByTestId('search-input') as HTMLInputElement;
    const searchInputValue = 'child';
    await user.type(input, searchInputValue);

    // Simulate a click inside the form
    user.click(form.baseElement);

    // Ensure the `overflow-hidden` class is still present
    expect(document.body.classList.contains('overflow-hidden')).toBe(true);
  });

  it('adds and removes event listener', () => {
    const addEventListenerSpy = vi.spyOn(window, 'addEventListener');
    const removeEventListenerSpy = vi.spyOn(window, 'removeEventListener');
    form = render(
      <BrowserRouter>
        <SearchForm />
      </BrowserRouter>
    );

    // Capture the exact function reference used
    const clickEvent = addEventListenerSpy.mock.calls.find(
      (call) => call[0] === 'click'
    );

    expect(clickEvent).toBeDefined();
    const [eventType, handler] = clickEvent!;
    expect(eventType).toBe('click');
    expect(typeof handler).toBe('function'); // Ensure it's a function

    // Unmount component and check if the listener was removed
    form.unmount();
    expect(removeEventListenerSpy).toHaveBeenCalledWith(eventType, handler);

    // Cleanup spies
    addEventListenerSpy.mockRestore();
    removeEventListenerSpy.mockRestore();
  });

  it('select next item in suggestion list', async () => {
    const input = form.queryByTestId('search-input') as HTMLInputElement;
    const searchInputValue = 'child';

    await act(async () => {
      await user.click(input);
      await user.type(input, searchInputValue);
    });

    let firstItem: HTMLElement;
    await waitFor(async () => {
      firstItem = form.container.querySelector('ul li:first-of-type')!;
      expect(firstItem).toBeInTheDocument();
      expect(firstItem?.classList).not.toContain('bg-primary-fade-2');
    });

    await act(async () => {
      await user.keyboard('{ArrowDown}');
    });

    await waitFor(() => {
      expect(firstItem?.classList).toContain('bg-primary-fade-2');
    });

    await act(async () => {
      await user.keyboard('{ArrowUp}');
    });

    await waitFor(() => {
      expect(firstItem?.classList).not.toContain('bg-primary-fade-2');
      expect(input.matches(':focus')).toBe(true);
    });
  });
});
