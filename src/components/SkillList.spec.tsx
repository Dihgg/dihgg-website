import { render, screen } from '@testing-library/react';
import SkillList from './SkillList';

describe('SkillList', () => {
  it('renders one list item per skill', () => {
    render(<SkillList skills={['React', 'TypeScript', 'Docker']} />);
    expect(screen.getAllByRole('listitem')).toHaveLength(3);
  });

  it('renders the skill label as text', () => {
    render(<SkillList skills={['React']} />);
    expect(screen.getByText('React')).toBeInTheDocument();
  });

  it('renders nothing when skills array is empty', () => {
    render(<SkillList skills={[]} />);
    expect(screen.queryAllByRole('listitem')).toHaveLength(0);
  });
});
