import { render, screen } from '@testing-library/react';
import Banner from './Banner';
import { BrowserRouter } from 'react-router-dom';

describe('Banner', () => {
  it('renders Banner component', () => {
    render(
      <BrowserRouter>
        <Banner />
      </BrowserRouter>
    );

    expect(
      screen.getByText(/An Official Website of the Singapore Government/i)
    ).toBeInTheDocument();
  });
});
