import Pill from './Pill';
import {
  SiTypescript,
  SiReact,
  SiAstro,
  SiTailwindcss,
  SiNodedotjs,
  SiJest,
  SiPhp,
  SiWordpress,
  SiPython,
  SiMysql,
  SiAngular
} from 'react-icons/si';
import { DiJava } from 'react-icons/di';
import type { ReactNode } from 'react';

type Props = {
  skills: string[];
};

const skillIconMap: Record<string, ReactNode> = {
  'TypeScript': <SiTypescript />,
  'React': <SiReact />,
  'Astro': <SiAstro />,
  'Tailwind': <SiTailwindcss />,
  'Node.js': <SiNodedotjs />,
  'Jest': <SiJest />,
  'PHP': <SiPhp />,
  'WordPress': <SiWordpress />,
  'Java': <DiJava />,
  'Python': <SiPython />,
  'MySQL': <SiMysql />,
  'Angular': <SiAngular />
};

export default function SkillList({ skills }: Props) {
  return (
    <ul className="flex flex-wrap gap-3">
      {skills.map((skill) => (
        <li key={skill}>
          <Pill label={skill} icon={skillIconMap[skill]} />
        </li>
      ))}
    </ul>
  );
}
