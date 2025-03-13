import { BrowserRouter } from "react-router"
import SearchSuggestion from "./SearchSuggestion"
import { suggestions } from "../../../tests/mock"
import { render, screen } from "@testing-library/react"

describe('SearchSuggestion', () => {
  it('renders SearchSuggestion component', () => {
    render(
      <BrowserRouter>
        <SearchSuggestion
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
})
