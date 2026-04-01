import Link from "next/link";

export default function Logo ( { redirectPage }: { redirectPage: string}) {
  return (
    <Link href={redirectPage} className="flex items-center gap-2">
      <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
        <span className="text-primary-foreground font-bold text-2xl">I</span>
      </div>
      <span className="font-bold text-xl text-foreground hidden sm:inline">
        Inventory
      </span>
    </Link>
  );
}