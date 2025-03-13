import { render, screen } from "@testing-library/react"
import { BrowserRouter } from "react-router"
import Header from "./Header"

describe('Header', () => {
  it('renders Header component', () => {
    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    )

    expect(screen.getByRole('banner')).toBeInTheDocument()
  })
})
