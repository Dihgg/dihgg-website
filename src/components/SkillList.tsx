import Pill from '@/components/Pill';
import classnames from 'classnames';

type SkillListProps = {
  skills: string[];
} & React.HTMLAttributes<HTMLUListElement>;

export default function SkillList({ skills, className, ...props }: SkillListProps) {
  return (
    <ul
      {...props}
      className={classnames(className, "flex flex-wrap gap-1 md:gap-2")} 
      >
      {skills.map((skill) => (
        <li key={skill}>
          <Pill icon={skill} tinted background>{skill}</Pill>
        </li>
      ))}
    </ul>
  );
}
