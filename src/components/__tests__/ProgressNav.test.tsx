import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import ProgressNav from '../ProgressNav';
import { months } from '../../data/timeline';

describe('ProgressNav', () => {
  it('renders month buttons and calls onJump', async () => {
    const onJump = vi.fn();
    render(<ProgressNav months={months} activeIndex={0} onJump={onJump} />);

    const october = screen.getByRole('button', { name: /October/i });
    await october.click();
    expect(onJump).toHaveBeenCalledWith(1);
  });
});
