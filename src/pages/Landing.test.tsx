import { render, screen } from '@testing-library/react';
import Landing from './Landing';
import { BrowserRouter } from 'react-router';

describe('Landing', () => {
  it('renders the Landing component', () => {
    render(
      <BrowserRouter>
        <Landing />
      </BrowserRouter>
    );

    expect(
      screen.getByText(/Search Portal for everybody/i)
    ).toBeInTheDocument();
  });
});
