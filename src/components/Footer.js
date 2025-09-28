export default function Footer() {
  return (
    <footer className="bg-[#2b214c] text-white">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-10 grid md:grid-cols-2 gap-6">
        <p className="text-sm/6 opacity-80">© {new Date().getFullYear()} MyNFTApp. Todos los derechos reservados.</p>
        <div className="flex items-center gap-4 md:justify-end">
          <a href="#" className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20">Twitter</a>
          <a href="#" className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20">Facebook</a>
          <a href="#" className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20">Instagram</a>
        </div>
      </div>
    </footer>
  )
}
