import Link from "next/link";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils"; // Assuming `cn` is a utility function for merging class names

type Props = {
  href: string;
  label: string;
  isActive?: boolean; // Indicates if the button is active
};

const NavButton = ({ href, label, isActive }: Props) => {
  return (
    <Button
      asChild // Ensures the Button component is rendered as a Link component
      size={"sm"}
      variant={"outline"}
      className={cn(
        "w-full lg:w-auto justify-center font-normal hover:bg-white/20 hover:text-white border-none focus-visible:ring-offset-0 focus-visible:ring-transparent outline-none text-white focus:bg-white/30 transition",
        isActive ? "bg-white/10 text-white" : "bg-transparent"
      )}
    >
      {/* The Link component is now directly rendered by the Button as the root */}
      <Link href={href}>
        {label}
      </Link>
    </Button>
  );
};

export default NavButton;
