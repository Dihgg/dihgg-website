import type { ReactNode } from 'react';
import classNames from 'classnames';

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
    SiSpringboot,
    SiSteam,
    SiGoogleplay,
    SiAppstore,
    SiGithubactions,
    SiLua
} from 'react-icons/si';
import { DiJava, DiPhotoshop } from 'react-icons/di';
import { RiComputerLine, RiTwitterXFill } from 'react-icons/ri';
import { FaEnvelope, FaGithub, FaLinkedin, FaMobileAlt, FaPodcast } from "react-icons/fa";
import { MdFindInPage, MdIosShare } from "react-icons/md";
import { GiRaiseZombie } from "react-icons/gi";
import { CgGames } from "react-icons/cg";
import { FaGear } from "react-icons/fa6";
import { TbBrandWhatsapp } from "react-icons/tb";
import { IoIosCopy } from "react-icons/io";

type IconConfig = {
    icon: ReactNode;
    tint?: string;
};

const iconMap: Record<string, IconConfig> = {
    'typescript': { icon: <SiTypescript />, tint: 'text-blue-600' },
    'react': { icon: <SiReact />, tint: 'text-cyan-500' },
    'astro': { icon: <SiAstro />, tint: 'text-orange-500' },
    'tailwind': { icon: <SiTailwindcss />, tint: 'text-teal-500' },
    'node.js': { icon: <SiNodedotjs />, tint: 'text-lime-600' },
    'jest': { icon: <SiJest />, tint: 'text-rose-700' },
    'php': { icon: <SiPhp />, tint: 'text-indigo-500' },
    'wordpress': { icon: <SiWordpress />, tint: 'text-blue-700' },
    'java': { icon: <DiJava />, tint: 'text-red-700' },
    'python': { icon: <SiPython />, tint: 'text-yellow-500' },
    'mysql': { icon: <SiMysql />, tint: 'text-cyan-700' },
    'angular': { icon: <SiAngular />, tint: 'text-rose-600' },
    'unity': { icon: <SiUnity />, tint: 'text-slate-800' },
    'sass': { icon: <SiSass />, tint: 'text-pink-500' },
    'photoshop': { icon: <DiPhotoshop />, tint: 'text-sky-500' },
    'javascript': { icon: <SiJavascript />, tint: 'text-amber-500' },
    'html5': { icon: <SiHtml5 />, tint: 'text-orange-600' },
    'css': { icon: <SiCss />, tint: 'text-sky-600' },
    'git': { icon: <SiGit />, tint: 'text-orange-600' },
    'express.js': { icon: <SiExpress />, tint: 'text-slate-700' },
    'docker': { icon: <SiDocker />, tint: 'text-blue-600' },
    'linux': { icon: <SiLinux />, tint: 'text-stone-700' },
    'spring boot': { icon: <SiSpringboot />, tint: 'text-emerald-600' },
    'computer': { icon: <RiComputerLine />, tint: 'text-slate-600' },
    'steam': { icon: <SiSteam />, tint: 'text-indigo-800' },
    'mobile': { icon: <FaMobileAlt />, tint: 'text-sky-600' },
    'podcast': { icon: <FaPodcast />, tint: 'text-violet-500' },
    'github': { icon: <FaGithub />, tint: 'text-slate-900' },
    'linkedin': { icon: <FaLinkedin />, tint: 'text-blue-700' },
    'linkeding': { icon: <FaLinkedin />, tint: 'text-blue-700' },
    'mail': { icon: <FaEnvelope />, tint: 'text-slate-600' },
    'google-play': { icon: <SiGoogleplay />, tint: 'text-emerald-600' },
    'app-store': { icon: <SiAppstore />, tint: 'text-slate-700' },
    'pagefind': { icon: <MdFindInPage />, tint: 'text-violet-600' },
    'github-actions': { icon: <SiGithubactions />, tint: 'text-blue-600' },
    'project-zomboid': { icon: <GiRaiseZombie />, tint: 'text-emerald-700' },
    'lua': { icon: <SiLua />, tint: 'text-indigo-600' },
    'games': { icon: <CgGames />, tint: 'text-purple-600' },
    'modding': { icon: <FaGear />, tint: 'text-fuchsia-600' },
    'twitter': { icon: <RiTwitterXFill />, tint: 'text-slate-900' },
    'whatsapp': { icon: <TbBrandWhatsapp />, tint: 'text-emerald-600' },
    'share': { icon: <MdIosShare />, tint: 'text-slate-600' },
    'copy': { icon: <IoIosCopy />, tint: 'text-slate-600' }
};

type Props = {
    name: string;
    tinted?: boolean;
};
export default function Icon({ name, tinted = false }: Props): ReactNode | null {
    const iconName = name.toLowerCase();
    const { icon, tint = '' } = iconMap[iconName];
    if (!!iconMap[iconName]) {
        return (
            <span
                aria-hidden
                className={classNames('pill__icon', { [tint]: tinted })}
            >
                {icon}
            </span>
        );
    }
    return null;
}