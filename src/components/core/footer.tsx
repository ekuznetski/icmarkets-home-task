export function Footer() {
  return (
    <footer className='w-full bg-zinc-900 text-white py-4'>
      <div className='container px-4 sm:px-2 text-sm font-bold mx-auto'>
        &copy; {new Date().getFullYear()} Crypto Portfolio. All rights reserved.
      </div>
    </footer>
  );
}
