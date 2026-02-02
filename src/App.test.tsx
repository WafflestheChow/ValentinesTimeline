import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import App from './App';

describe('App', () => {
  it('renders the timeline heading', () => {
    render(<App />);
    expect(
      screen.getByRole('heading', { name: /Six months of us, captured in soft light/i })
    ).toBeInTheDocument();
  });
});
