type LoaderProps = {
  text?: string;
};

export default function Loader({ text }: LoaderProps) {
  return (
    <div className="flex justify-center items-center gap-2 w-full">
      <img src="/loader.svg" width={24} height={24} alt="loader" />
      {text && <span>{text}</span>}
    </div>
  );
}
