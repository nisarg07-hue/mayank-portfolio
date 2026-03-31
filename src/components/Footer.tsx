import { Container } from "./Container";

export function Footer() {
  return (
    <footer className="py-10">
      <Container>
        <div className="flex flex-col gap-4 border-t border-[color:var(--hairline)] pt-8 sm:flex-row sm:items-center sm:justify-between">
          <div className="text-xs tracking-[0.22em] uppercase text-zinc-500">
            © {new Date().getFullYear()} Mayank Singh
          </div>
          <div className="flex items-center gap-5 text-xs tracking-[0.18em] uppercase text-zinc-400">
            <a className="hover:text-zinc-100 transition-colors inline-flex items-center gap-2" href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
              Instagram
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
}

