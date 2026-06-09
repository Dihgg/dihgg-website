import { STACK_ITEMS_MAX_COUNT } from "@/lib/constants";
import { normalize } from "@/lib/utils";
import Pill, { type PillProps } from "@/components/Pill";
import classnames from "classnames";

export type PillStackProps = {
    items: string[];
    maxCount?: number;
    tinted?: boolean;
    className?: string;
    variant?: PillProps['variant'];
};

export default function PillStack(props: PillStackProps) {
    const {
        items,
        maxCount = STACK_ITEMS_MAX_COUNT,
        tinted = false,
        className = "",
        variant = "tag--small"
    } = props;
    
    if (items.length === 0) {
        return null;
    }
    
    return (
        <ul className={classnames("pill-stack", className)}>
            {items.slice(0, maxCount).map((item) => (
                <li key={item} className="pill-stack__item">
                    <Pill icon={normalize(item)} variant={variant} tinted={tinted}>{item}</Pill>
                </li>
            ))}
            {items.length > maxCount && (
                <li className="pill-stack__item" title={items.slice(maxCount).join(", ")}>
                    <Pill variant={variant} tinted={tinted}>+{items.length - maxCount}</Pill>
                </li>
            )}
        </ul>
    );
}