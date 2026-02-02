import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import Timeline from '../Timeline';
import { months } from '../../data/timeline';

describe('Timeline', () => {
  it('renders month sections', () => {
    render(<Timeline months={months} />);
    expect(screen.getByRole('heading', { name: 'September' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'February' })).toBeInTheDocument();
  });
});
