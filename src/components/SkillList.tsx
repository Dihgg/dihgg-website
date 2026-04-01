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
  SiAngular,
  SiUnity,
  SiSass,
  SiJavascript,
  SiHtml5,
  SiCss,
  SiGit,
  SiExpress,
  SiDocker,
  SiLinux,
  SiSpringboot
} from 'react-icons/si';
import { DiJava, DiPhotoshop } from 'react-icons/di';
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
  'Angular': <SiAngular />,
  'Unity': <SiUnity />,
  'Sass': <SiSass />,
  'Photoshop': <DiPhotoshop />,
  'JavaScript': <SiJavascript />,
  'HTML5': <SiHtml5 />,
  'CSS': <SiCss />,
  'Git': <SiGit />,
  'Express.js': <SiExpress />,
  'Docker': <SiDocker />,
  'Linux': <SiLinux />,
  'Spring Boot (Java)': <SiSpringboot />

};

export default function SkillList({ skills }: Props) {
  return (
    <ul className="flex flex-wrap gap-3">
      {skills.map((skill) => (
        <li key={skill}>
          <Pill icon={skillIconMap[skill]}>{skill}</Pill>
        </li>
      ))}
    </ul>
  );
}
