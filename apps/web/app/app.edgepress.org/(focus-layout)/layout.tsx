export default function FocusLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className='flex h-screen w-screen flex-col p-4'>
      <div className='flex-1 overflow-y-auto'>{children}</div>
    </div>
  );
}
