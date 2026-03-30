import { render, screen } from '@testing-library/react';
import SocialLinks from './SocialLinks';

describe('SocialLinks', () => {
  it('renders all social links', () => {
    render(
      <SocialLinks
        links={[
          { label: 'GitHub', href: 'https://github.com/Dihgg' },
          { label: 'LinkedIn', href: 'https://linkedin.com/in/dihgg' }
        ]}
      />
    );

    expect(screen.getByRole('link', { name: 'GitHub' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'LinkedIn' })).toBeInTheDocument();
  });
});
