import { render, screen, fireEvent } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import LightboxModal from '../LightboxModal';

describe('LightboxModal', () => {
  it('navigates and closes with escape', () => {
    const onClose = vi.fn();
    const images = [
      { src: '/one.jpg', alt: 'One' },
      { src: '/two.jpg', alt: 'Two' }
    ];

    render(<LightboxModal isOpen images={images} startIndex={0} onClose={onClose} />);

    expect(screen.getByRole('img', { name: 'One' })).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: /next/i }));
    expect(screen.getByRole('img', { name: 'Two' })).toBeInTheDocument();

    fireEvent.keyDown(window, { key: 'Escape' });
    expect(onClose).toHaveBeenCalled();
  });

  it('renders placeholder when image fails', () => {
    const onClose = vi.fn();
    const images = [{ src: '/missing.jpg', alt: 'Missing' }];

    render(<LightboxModal isOpen images={images} startIndex={0} onClose={onClose} />);

    const img = screen.getByRole('img', { name: 'Missing' });
    fireEvent.error(img);

    expect(screen.getByText('Missing')).toBeInTheDocument();
  });
});
