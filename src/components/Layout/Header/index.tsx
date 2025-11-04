import {
  type AnchorHTMLAttributes,
  memo,
  type PropsWithChildren,
  useEffect,
  useState
} from "react";
import { HiArrowSmallLeft } from "react-icons/hi2";
import { useLocation, useNavigate } from "react-router";
import { twMerge } from "tailwind-merge";

export interface IHeader
  extends Omit<AnchorHTMLAttributes<HTMLHeadElement>, "title"> {
  title?: React.ReactNode;
  back?: () => void;
  hideBack?: boolean;
  backdropBg?: boolean;
  replaceBackRouter?: string;
  fullWidth?: boolean;
  position?: "center" | "left";
}

const Header = ({
  className = "",
  title,
  back,
  hideBack,
  backdropBg = false,
  replaceBackRouter,
  children,
  fullWidth = true,
  position = "center"
}: PropsWithChildren<IHeader>) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);

  // console.log("🚀 ~ location.key:", location.key);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      setIsScrolled(scrollTop > 10);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleBack = () => {
    if (back) {
      return back();
    }

    if (location.key === "default" && replaceBackRouter) {
      return navigate(replaceBackRouter);
    }

    navigate(-1);
  };

  return (
    <header
      className={twMerge(
        "sticky top-0 z-50 flex h-12 w-full items-center justify-between transition-all duration-300",
        isScrolled
          ? "bg-[rgba(255,255,255,0.8)] backdrop-blur-xl dark:bg-[rgba(0,0,0,0.8)]"
          : "bg-transparent",
        backdropBg && "backdrop-blur-md",
        fullWidth && "px-4",
        className
      )}
    >
      <div className="flex items-center justify-center">
        {!hideBack && (
          <button
            className="flex cursor-pointer items-center justify-center"
            type="button"
            onClick={handleBack}
          >
            <HiArrowSmallLeft size={24} />
          </button>
        )}
        {position === "left" && (
          <span className="pl-2 font-medium text-foreground text-lg">
            {title}
          </span>
        )}
      </div>
      {position === "center" && (
        <div className="-translate-x-1/2 absolute left-1/2 text-lg">
          {title}
        </div>
      )}
      <div>{children}</div>
    </header>
  );
};

export default memo(Header);
