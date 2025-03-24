import { BrowserRouter } from "react-router"
import SearchSuggestion from "./SearchSuggestion"
import { suggestions } from "../../../tests/mock"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"

describe('SearchSuggestion', () => {
  it('renders SearchSuggestion component', () => {
    render(
      <BrowserRouter>
        <SearchSuggestion
          searchTerms={['test']}
          suggestions={suggestions}
          error=''
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          doSearch={(_text: string) => {}}
          activeIndex={0}
        />
      </BrowserRouter>
    )

    expect(screen.queryByTestId('search-suggestion')).toBeInTheDocument()
  })

  it('call doSearch when click on suggestion item', async () => {
    const user = userEvent.setup();
    const doSearch = vitest.fn();

    render(
      <BrowserRouter>
        <SearchSuggestion
          searchTerms={['test']}
          suggestions={suggestions}
          error=''
          doSearch={doSearch}
          activeIndex={0}
        />
      </BrowserRouter>
    )

    const suggestion = screen.queryByTestId('search-suggestion');
    await user.click(suggestion?.querySelector('li') as HTMLLIElement);
    expect(doSearch).toHaveBeenCalled()
  })
})
