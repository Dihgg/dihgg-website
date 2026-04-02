import type { ReactNode } from 'react';
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
import { RiComputerLine } from 'react-icons/ri';
import { FaEnvelope, FaGithub, FaLinkedin, FaMobileAlt, FaPodcast } from "react-icons/fa";
import { MdFindInPage } from "react-icons/md";
import { GiRaiseZombie } from "react-icons/gi";
import { CgGames } from "react-icons/cg";
import { FaGear } from "react-icons/fa6";

const iconMap: Record<string, ReactNode> = {
    'typescript': <SiTypescript />,
    'react': <SiReact />,
    'astro': <SiAstro />,
    'tailwind': <SiTailwindcss />,
    'node.js': <SiNodedotjs />,
    'jest': <SiJest />,
    'php': <SiPhp />,
    'wordpress': <SiWordpress />,
    'java': <DiJava />,
    'python': <SiPython />,
    'mysql': <SiMysql />,
    'angular': <SiAngular />,
    'unity': <SiUnity />,
    'sass': <SiSass />,
    'photoshop': <DiPhotoshop />,
    'javascript': <SiJavascript />,
    'html5': <SiHtml5 />,
    'css': <SiCss />,
    'git': <SiGit />,
    'express.js': <SiExpress />,
    'docker': <SiDocker />,
    'linux': <SiLinux />,
    'spring boot': <SiSpringboot />,
    'computer': <RiComputerLine />,
    'steam': <SiSteam />,
    'mobile': <FaMobileAlt />,
    'podcast': <FaPodcast />,
    'github': <FaGithub />,
    'linkedin': <FaLinkedin />,
    'mail': <FaEnvelope />,
    'google-play': <SiGoogleplay />,
    'app-store': <SiAppstore />,
    'pagefind': <MdFindInPage />,
    'github-actions': <SiGithubactions />,
    'project-zomboid': <GiRaiseZombie />,
    'lua': <SiLua />,
    'games': <CgGames />,
    'modding': <FaGear />
};

export default function Icon({ name }: { name: string }): ReactNode | null {
    const icon = iconMap[name.toLowerCase()];
    return icon ?? null;
}