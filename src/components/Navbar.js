import Image from 'next/image';

const Navbar = () => {
  return (
    <>
      <div className='flex justify-between items-center bg-blue-950 text-white px-8 h-[60px]'>
        <div className='flex items-center'>
          <Image src="/assets/logo.png" alt="Logo" width={154} height={20} />
        </div>
        <nav>
          <ul className='flex gap-6 list-none m-0 p-0'>
            <li><a href="#">Home</a></li>
            <li><a href="#">About</a></li>
            <li><a href="#">Contact</a></li>
          </ul>
        </nav>
      </div>
    </>
  );
};

export default Navbar;