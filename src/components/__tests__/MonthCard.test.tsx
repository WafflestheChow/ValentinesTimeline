import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import MonthCard from '../MonthCard';
import { months } from '../../data/timeline';

describe('MonthCard', () => {
  it('renders month content and triggers view gallery', async () => {
    const onOpenLightbox = vi.fn();
    const onViewGallery = vi.fn();

    render(
      <MonthCard
        month={months[0]}
        galleryId="sep-gallery"
        onOpenLightbox={onOpenLightbox}
        onViewGallery={onViewGallery}
        reducedMotion={true}
      />
    );

    expect(screen.getByText(months[0].title)).toBeInTheDocument();

    const viewButton = screen.getByRole('button', { name: /view photos/i });
    await viewButton.click();
    expect(onViewGallery).toHaveBeenCalledWith('sep-gallery');

    const imageButton = screen.getByRole('button', { name: /September memory 01/i });
    await imageButton.click();
    expect(onOpenLightbox).toHaveBeenCalledWith('sep', 0);
  });
});
