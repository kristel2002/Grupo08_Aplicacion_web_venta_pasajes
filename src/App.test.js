import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Tourest travel agency', () => {
  render(<App />);
  const linkElement = screen.getByText(/Tourest/i);
  expect(linkElement).toBeInTheDocument();
});