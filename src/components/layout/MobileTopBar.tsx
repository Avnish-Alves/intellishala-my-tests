import Logo from "@/components/layout/Logo";

export default function MobileTopBar() {
  return (
    <div className="flex h-16 items-center bg-white px-4 xl:hidden">
      <Logo />
    </div>
  );
}
