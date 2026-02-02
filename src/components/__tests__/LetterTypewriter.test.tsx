import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import LetterTypewriter from '../LetterTypewriter';

const letter = 'Hello love.';

describe('LetterTypewriter', () => {
  it('renders and can skip to full text', async () => {
    const originalMatchMedia = window.matchMedia;
    window.matchMedia = vi.fn().mockImplementation(() => ({
      matches: true,
      media: '',
      onchange: null,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      addListener: vi.fn(),
      removeListener: vi.fn(),
      dispatchEvent: vi.fn()
    }));

    render(<LetterTypewriter text={letter} />);

    const skipButton = screen.getByRole('button', { name: /skip/i });
    await skipButton.click();

    expect(screen.getByText(letter)).toBeInTheDocument();
    window.matchMedia = originalMatchMedia;
  });
});
