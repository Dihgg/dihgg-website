import classNames from "classnames";
import type { HTMLAttributes } from "react";

const Logo = (props: HTMLAttributes<HTMLDivElement>) => {
    const { className, ...rest } = props;
    return (
        <div className={classNames("logo", className)} {...rest}>
            <img
                src="/images/avatar.png"
                alt="Dihgg avatar"
                className="logo__avatar"
            />
            <span className="logo__text">{'Dihgg'}</span>
        </div>
    );
};

export default Logo;