import Pill from '@/components/Pill';

type Props = {
  skills: string[];
};

export default function SkillList({ skills }: Props) {
  return (
    <ul className="flex flex-wrap gap-1 md:gap-2">
      {skills.map((skill) => (
        <li key={skill}>
          <Pill icon={skill} tinted>{skill}</Pill>
        </li>
      ))}
    </ul>
  );
}
