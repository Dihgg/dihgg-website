import type { ReactNode } from 'react';
import classNames from 'classnames';
import { normalize } from '@/lib/utils';

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
    SiLua,
    SiAudacity,
    SiCoffeescript,
    SiNexusmods,
} from 'react-icons/si';
import { DiJava, DiPhotoshop } from 'react-icons/di';
import { RiComputerLine, RiTwitterXFill } from 'react-icons/ri';
import { FaEnvelope, FaGithub, FaLinkedin, FaMobileAlt, FaPodcast, FaBrain, FaNetworkWired, FaFigma, FaBookDead } from "react-icons/fa";
import { MdFindInPage, MdIosShare } from "react-icons/md";
import { GiRaiseZombie, GiArtificialIntelligence } from "react-icons/gi";
import { CgGames } from "react-icons/cg";
import { FaArrowLeft, FaGear } from "react-icons/fa6";
import { TbBrandWhatsapp, TbWorldWww } from "react-icons/tb";
import { IoIosCopy } from "react-icons/io";
import { CiServer } from "react-icons/ci";
import { HiMiniComputerDesktop } from "react-icons/hi2"
import { PiFileSqlFill, PiMailboxBold } from "react-icons/pi";

type IconConfig = {
    icon: ReactNode;
    tint?: string;
    background?: string;
};

/**
 * Generates a mapping of normalized keys to icon configurations based on provided keys and a shared configuration.
 * @param keys An array of strings that represent the different variations of a name to be normalized and mapped to the same icon configuration.
 * @param config The icon configuration (icon and optional tint) that will be associated with each normalized key derived from the input keys.
 * @returns A record where each normalized key maps to the provided icon configuration, allowing for multiple variations of a name to share the same icon and tint settings.
 */
function sharedIcons(keys: string[], config: IconConfig): Record<string, IconConfig> {
    return keys.reduce<Record<string, IconConfig>>((acc, key) => {
        acc[normalize(key)] = config;
        return acc;
    }, {});
}

export const ICON_MAP: Record<string, IconConfig> = {
    ['arrow-left']: { icon: <FaArrowLeft />, tint: 'text-slate-600', background: 'rgb(71 85 105)' },
    ['typescript']: { icon: <SiTypescript />, tint: 'text-blue-600', background: 'rgb(37 99 235)' },
    ['react']: { icon: <SiReact />, tint: 'text-cyan-500', background: 'rgb(6 182 212)' },
    ['astro']: { icon: <SiAstro />, tint: 'text-orange-500', background: 'rgb(249 115 22)' },
    ['tailwind']: { icon: <SiTailwindcss />, tint: 'text-teal-500', background: 'rgb(20 184 166)' },
    ['jest']: { icon: <SiJest />, tint: 'text-rose-700', background: 'rgb(190 18 60)' },
    ['php']: { icon: <SiPhp />, tint: 'text-indigo-500', background: 'rgb(99 102 241)' },
    ['wordpress']: { icon: <SiWordpress />, tint: 'text-blue-700', background: 'rgb(29 78 216)' },
    ['java']: { icon: <DiJava />, tint: 'text-red-700', background: 'rgb(185 28 28)' },
    ['python']: { icon: <SiPython />, tint: 'text-yellow-500', background: 'rgb(234 179 8)' },
    ['mysql']: { icon: <SiMysql />, tint: 'text-cyan-700', background: 'rgb(14 116 144)' },
    ['angular']: { icon: <SiAngular />, tint: 'text-rose-600', background: 'rgb(225 29 72)' },
    ['unity']: { icon: <SiUnity />, tint: 'text-slate-800', background: 'rgb(30 41 59)' },
    ['sass']: { icon: <SiSass />, tint: 'text-pink-500', background: 'rgb(236 72 153)' },
    ['photoshop']: { icon: <DiPhotoshop />, tint: 'text-sky-500', background: 'rgb(14 165 233)' },
    ['javascript']: { icon: <SiJavascript />, tint: 'text-amber-500', background: 'rgb(245 158 11)' },
    ['coffeescript']: { icon: <SiCoffeescript />, tint: 'text-brown-500', background: 'rgb(120 83 58)' },
    ...sharedIcons(['html', 'html5'], { icon: <SiHtml5 />, tint: 'text-orange-600', background: 'rgb(234 88 12)' }),
    ...sharedIcons(['css', 'css3'], { icon: <SiCss />, tint: 'text-sky-600', background: 'rgb(2 132 199)' }),
    ['git']: { icon: <SiGit />, tint: 'text-orange-600', background: 'rgb(234 88 12)' },
    ['express.js']: { icon: <SiExpress />, tint: 'text-slate-700', background: 'rgb(51 65 85)' },
    ['docker']: { icon: <SiDocker />, tint: 'text-blue-600', background: 'rgb(37 99 235)' },
    ['linux']: { icon: <SiLinux />, tint: 'text-stone-700', background: 'rgb(68 64 60)' },
    ['spring-boot']: { icon: <SiSpringboot />, tint: 'text-emerald-600', background: 'rgb(5 150 105)' },
    ['steam']: { icon: <SiSteam />, tint: 'text-indigo-800', background: 'rgb(55 48 163)' },
    ['mobile']: { icon: <FaMobileAlt />, tint: 'text-sky-600', background: 'rgb(2 132 199)' },
    ['podcast']: { icon: <FaPodcast />, tint: 'text-violet-500', background: 'rgb(139 92 246)' },
    ['github']: { icon: <FaGithub />, tint: 'text-slate-900', background: 'rgb(15 23 42)' },
    ['linkedin']: { icon: <FaLinkedin />, tint: 'text-blue-700', background: 'rgb(29 78 216)' },
    ['mail']: { icon: <FaEnvelope />, tint: 'text-slate-600', background: 'rgb(71 85 105)' },
    ['google-play']: { icon: <SiGoogleplay />, tint: 'text-emerald-600', background: 'rgb(5 150 105)' },
    ['app-store']: { icon: <SiAppstore />, tint: 'text-slate-700', background: 'rgb(51 65 85)' },
    ['pagefind']: { icon: <MdFindInPage />, tint: 'text-violet-600', background: 'rgb(124 58 237)' },
    ['github-actions']: { icon: <SiGithubactions />, tint: 'text-blue-600', background: 'rgb(37 99 235)' },
    ['project-zomboid']: { icon: <GiRaiseZombie />, tint: 'text-emerald-700', background: 'rgb(4 120 87)' },
    ['lua']: { icon: <SiLua />, tint: 'text-indigo-600', background: 'rgb(79 70 229)' },
    ['sql']: { icon: <PiFileSqlFill />, tint: 'text-cyan-700', background: 'rgb(14 116 144)' },
    ['modding']: { icon: <FaGear />, tint: 'text-fuchsia-600', background: 'rgb(192 38 211)' },
    ['twitter']: { icon: <RiTwitterXFill />, tint: 'text-slate-900', background: 'rgb(15 23 42)' },
    ['whatsapp']: { icon: <TbBrandWhatsapp />, tint: 'text-emerald-600', background: 'rgb(5 150 105)' },
    ['share']: { icon: <MdIosShare />, tint: 'text-slate-600', background: 'rgb(71 85 105)' },
    ['copy']: { icon: <IoIosCopy />, tint: 'text-slate-600', background: 'rgb(71 85 105)' },
    ['network']: { icon: <FaNetworkWired />, tint: 'text-slate-700', background: 'rgb(51 65 85)' },
    ['figma']: { icon: <FaFigma />, tint: 'text-fuchsia-600', background: 'rgb(192 38 211)' },
    ['audacity']: { icon: <SiAudacity />, tint: 'text-violet-600', background: 'rgb(124 58 237)' },
    ['nexusmods']: { icon: <SiNexusmods />, tint: 'text-yellow-800', background: 'rgb(133 77 14)' },
    ...sharedIcons(['node', 'nodejs', 'node.js'], { icon: <SiNodedotjs />, tint: 'text-lime-600', background: 'rgb(101 163 13)' }),
    ...sharedIcons(['computer', 'computador', 'computacao'], { icon: <RiComputerLine />, tint: 'text-slate-700', background: 'rgb(51 65 85)' }),
    ...sharedIcons(['games', 'jogos'], { icon: <CgGames />, tint: 'text-purple-600', background: 'rgb(147 51 234)' }),
    ...sharedIcons(['philosophy', 'filosofia'], { icon: <FaBrain />, tint: 'text-yellow-500', background: 'rgb(234 179 8)' }),
    ...sharedIcons(['ai', 'artificial-intelligence', 'inteligencia-artificial'], { icon: <GiArtificialIntelligence />, tint: 'text-gray-700', background: 'rgb(55 65 81)' }),
    ...sharedIcons(['frontend'], { icon: <HiMiniComputerDesktop />, tint: 'text-red-500', background: 'rgb(239 68 68)' }),
    ...sharedIcons(['backend', 'server'], { icon: <CiServer />, tint: 'text-blue-500', background: 'rgb(59 130 246)' }),
    ...sharedIcons(['web-development', 'web'], { icon: <TbWorldWww />, tint: 'text-green-500', background: 'rgb(34 197 94)' }),
    ['book-dead']: { icon: <FaBookDead />, tint: 'text-red-700', background: 'rgb(185 28 28)' },
    ['mailbox']: { icon: <PiMailboxBold />, tint: 'text-blue-500', background: 'rgb(59 130 246)' },
};

export function getIconConfig(name: string | undefined ): IconConfig | undefined {
    if (!name) return undefined;
    return ICON_MAP[normalize(name)];
}

type Props = {
    name: string;
    tinted?: boolean;
};
export default function Icon({ name, tinted = false }: Props): ReactNode | null {
    const iconName = normalize(name);
    if (!!ICON_MAP[iconName]) {
        const { icon, tint = '' } = ICON_MAP[iconName];
        return (
            <span data-testid="icon" className={classNames('pill__icon', { [tint]: tinted })} aria-hidden>{icon}</span>
        );
    }
    return null;
}