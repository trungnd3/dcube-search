import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Layout from './Layout';
import Header from './Header';

describe('Layout', () => {
  it('renders Layout component', () => {
    render(
      <BrowserRouter>
        <Layout>
          <Header />
        </Layout>
      </BrowserRouter>
    );

    expect(screen.getByRole('main')).toBeInTheDocument();
  });
});
