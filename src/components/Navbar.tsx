import { Link } from "react-router-dom";
import { ModeToggle } from "./ui/ModeToggle";
import { NamedLogoWithLink } from "./Logo";
import { buttonVariants } from "./ui/button";

export default function HeroNav() {
    return (
        <nav className="w-full flex flex-row items-center justify-between h-16 top-0 sticky bg-background">
            <NamedLogoWithLink />
            <div className="flex flex-row items-center">
                <ModeToggle />
                <Link
                    to="/login"
                    className={buttonVariants({
                        variant: "link",
                        className: "text-base",
                        size: "sm",
                    })}
                >
                    Login
                </Link>
                <Link
                    to="/register"
                    className={buttonVariants({
                        variant: "link",
                        className: "text-base",
                        size: "sm",
                    })}
                >
                    Register
                </Link>
            </div>
        </nav>
    );
}
