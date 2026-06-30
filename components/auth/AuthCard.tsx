type AuthCardProps = {
  title: string;
  description: string;
  children: React.ReactNode;
};

export default function AuthCard({
  title,
  description,
  children,
}: AuthCardProps) {
  return (
    <>
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-white">
          {title}
        </h1>

        <p className="mt-2 text-slate-400">
          {description}
        </p>
      </div>

      {children}
    </>
  );
}