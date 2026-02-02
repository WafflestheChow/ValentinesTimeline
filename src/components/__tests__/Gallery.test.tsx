import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import Gallery from '../Gallery';

const images = [
  { src: '/test-1.jpg', alt: 'Test 1' },
  { src: '/test-2.jpg', alt: 'Test 2' }
];

describe('Gallery', () => {
  it('renders images and calls onOpenLightbox', async () => {
    const onOpenLightbox = vi.fn();
    render(
      <Gallery id="test" images={images} monthTitle="Test" onOpenLightbox={onOpenLightbox} />
    );

    const button = screen.getByRole('button', { name: /open test 1/i });
    await button.click();
    expect(onOpenLightbox).toHaveBeenCalledWith(0);
  });

  it('shows placeholder when image fails to load', () => {
    const onOpenLightbox = vi.fn();
    render(<Gallery id="test" images={images} monthTitle="Test" onOpenLightbox={onOpenLightbox} />);

    const img = screen.getByRole('img', { name: 'Test 1' });
    fireEvent.error(img);

    expect(screen.getByText('Test 1')).toBeInTheDocument();
  });
});
