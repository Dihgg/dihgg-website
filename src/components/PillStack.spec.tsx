import { render, screen } from '@testing-library/react';
import PillStack from './PillStack';

// STACK_ITEMS_MAX_COUNT is mocked to 2 via jest.config.ts moduleNameMapper

describe('PillStack', () => {
  describe('empty items', () => {
    it('renders nothing when items is empty', () => {
      const { container } = render(<PillStack items={[]} />);
      expect(container.firstChild).toBeNull();
    });
  });

  describe('list rendering', () => {
    it('renders a list item for each item up to maxCount', () => {
      render(<PillStack items={['React', 'TypeScript']} />);
      expect(screen.getByText('React')).toBeInTheDocument();
      expect(screen.getByText('TypeScript')).toBeInTheDocument();
    });

    it('renders all items when count is below the default maxCount', () => {
      render(<PillStack items={['React']} />);
      expect(screen.getAllByRole('listitem')).toHaveLength(1);
    });
  });

  describe('overflow indicator', () => {
    it('shows a +N pill when items exceed maxCount', () => {
      render(<PillStack items={['React', 'TypeScript', 'Node']} />);
      expect(screen.getByText('+1')).toBeInTheDocument();
    });

    it('does not show the overflow pill when items equal maxCount', () => {
      render(<PillStack items={['React', 'TypeScript']} />);
      expect(screen.queryByText(/^\+/)).toBeNull();
    });

    it('sets a title on the overflow pill listing hidden items', () => {
      render(<PillStack items={['React', 'TypeScript', 'Node', 'Docker']} />);
      const overflowItem = screen.getByTitle('Node, Docker');
      expect(overflowItem).toBeInTheDocument();
      expect(screen.getByText('+2')).toBeInTheDocument();
    });

    it('respects a custom maxCount prop', () => {
      render(<PillStack items={['A', 'B', 'C', 'D']} maxCount={3} />);
      expect(screen.getByText('A')).toBeInTheDocument();
      expect(screen.getByText('B')).toBeInTheDocument();
      expect(screen.getByText('C')).toBeInTheDocument();
      expect(screen.queryByText('D')).toBeNull();
      expect(screen.getByText('+1')).toBeInTheDocument();
    });
  });

  describe('CSS classes', () => {
    it('applies the pill-stack class to the list element', () => {
      const { container } = render(<PillStack items={['React']} />);
      expect(container.firstChild).toHaveClass('pill-stack');
    });

    it('merges an extra className onto the list element', () => {
      const { container } = render(<PillStack items={['React']} className="my-class" />);
      expect(container.firstChild).toHaveClass('pill-stack', 'my-class');
    });
  });
});
