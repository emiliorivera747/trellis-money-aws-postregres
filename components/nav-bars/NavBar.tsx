// Next
import Link from "next/link";
import Image from "next/image";

// Components
import SignInButton from "@/features/auth/components/buttons/SignInButton";
import SignOutButton from "@/features/auth/components/buttons/SignOutButton";

interface NavbarProps {
  isAuthenticated?: boolean | null;
}

const NavBar = ({ isAuthenticated }: NavbarProps) => {
  return (
    <nav className="sticky top-0 z-50 bg-white dark:bg-gray-900 flex items-center justify-between border-b border-gray-200 dark:border-gray-800 py-5 mx-10 sm:px-4 sm:py-5">
      <div className="flex items-center">
        <Link href="/" className="flex items-end">
          <span className="text-xl font-bold text-tertiary-1000  flex items-end">
            <Image
              src="/Logo.svg"
              alt="logo"
              height={0}
              width={0}
              className="h-[1.8rem] w-[1.8rem]"
            />
            rellis Money
          </span>
        </Link>
      </div>
      <div className="flex items-center gap-6">
        <Link
          href="/careers"
          className="text-sm  text-tertiary-800 hover:text-tertiary-1000 transition-colors"
        >
          Careers
        </Link>
        {isAuthenticated ? <SignOutButton /> : <SignInButton />}
      </div>
    </nav>
  );
};

export default NavBar;
