type AuthInputProps = {
  label: string;
  type?: string;
  placeholder: string;
  name: string;
};

export default function AuthInput({
  label,
  type = "text",
  placeholder,
  name,
}: AuthInputProps) {
  return (
    <div>
      <label
        htmlFor={name}
        className="mb-2 block text-sm font-medium text-slate-300"
      >
        {label}
      </label>

      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-indigo-500"
      />
    </div>
  );
}