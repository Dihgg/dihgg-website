import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Pill from './Pill';

describe('Pill', () => {
  describe('as a link', () => {
    it('renders an anchor when href is provided', () => {
      render(<Pill href="/about">About</Pill>);
      expect(screen.getByRole('link', { name: 'About' })).toHaveAttribute('href', '/about');
    });

    it('adds target and rel for external links', () => {
      render(<Pill href="https://example.com" external>External</Pill>);
      const link = screen.getByRole('link', { name: 'External' });
      expect(link).toHaveAttribute('target', '_blank');
      expect(link).toHaveAttribute('rel', 'noreferrer');
    });

    it('does not add target/rel for internal links', () => {
      render(<Pill href="/contact">Contact</Pill>);
      const link = screen.getByRole('link', { name: 'Contact' });
      expect(link).not.toHaveAttribute('target');
      expect(link).not.toHaveAttribute('rel');
    });
  });

  describe('as a button', () => {
    it('renders a button when onClick is provided', () => {
      const handleClick = jest.fn();
      render(<Pill onClick={handleClick}>Click me</Pill>);
      expect(screen.getByRole('button', { name: 'Click me' })).toBeInTheDocument();
    });

    it('calls onClick when clicked', async () => {
      const handleClick = jest.fn();
      render(<Pill onClick={handleClick}>Click me</Pill>);
      await userEvent.click(screen.getByRole('button'));
      expect(handleClick).toHaveBeenCalledTimes(1);
    });
  });

  describe('as a span', () => {
    it('renders a span when neither href nor onClick is provided', () => {
      render(<Pill>Label</Pill>);
      expect(screen.getByText('Label').tagName).toBe('SPAN');
    });
  });

  describe('CSS classes', () => {
    it('applies default variant class', () => {
      render(<Pill>Default</Pill>);
      expect(screen.getByText('Default')).toHaveClass('pill--default');
    });

    it('applies a custom variant class', () => {
      render(<Pill variant="primary">Primary</Pill>);
      expect(screen.getByText('Primary')).toHaveClass('pill--primary');
    });

    it('merges extra className', () => {
      render(<Pill className="my-extra-class">Extra</Pill>);
      expect(screen.getByText('Extra')).toHaveClass('my-extra-class');
    });
  });
});
