export default function PageSection({
  children,
  className = '',
  fullWidth = false,
  noPaddingTop = false,
}) {
  return (
    <section
      className={`relative min-h-screen w-full ${
        noPaddingTop ? 'pt-0' : 'pt-24 md:pt-28'
      } pb-20 md:pb-28 ${className}`}
    >
      <div
        className={
          fullWidth
            ? 'w-full'
            : 'section-container mx-auto w-full max-w-6xl px-5 sm:px-8'
        }
      >
        {children}
      </div>
    </section>
  )
}
