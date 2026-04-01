import Pill from '@/components/Pill';

type Props = {
  skills: string[];
};



export default function SkillList({ skills }: Props) {
  return (
    <ul className="flex flex-wrap gap-3">
      {skills.map((skill) => (
        <li key={skill}>
          <Pill icon={skill}>{skill}</Pill>
        </li>
      ))}
    </ul>
  );
}
