import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import LayoutContainer from './LayoutContainer';

describe('LayoutContainer', () => {
  it('renders LayoutContainer component', () => {
    render(
      <BrowserRouter>
        <LayoutContainer>test container</LayoutContainer>
      </BrowserRouter>
    );

    expect(screen.queryByTestId('container')).toBeInTheDocument();
  });
});
