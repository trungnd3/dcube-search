import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router';
import Container from './Container';

describe('Container', () => {
  it('renders Container component', () => {
    render(
      <BrowserRouter>
        <Container>test container</Container>
      </BrowserRouter>
    );

    expect(screen.queryByTestId('container')).toBeInTheDocument();
  });
});
