import { render, screen } from '@testing-library/react';
import LoadingSpinner from './LoadingSpinner';

describe('LoadingSpinner', () => {
  it('renders LoadingSpinner component', () => {
    render(<LoadingSpinner />);
    expect(screen.queryByTestId('loading-spinner')).toBeInTheDocument();
  });
});
