import { Navbar } from "@/components/navbar";

type THomeLayoutProps = {
  children: React.ReactNode;
};

export function HomeLayout(props: THomeLayoutProps) {
  const { children } = props;
  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <div className="flex-1 overflow-y-auto">{children}</div>
    </div>
  );
}
