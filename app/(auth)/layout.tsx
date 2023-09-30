export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className='h-full flex flex-col lg:flex-row items-center gap-10 justify-center'>
      <h1 className='text-3xl md:text-5xl xl:text-7xl text-center'>
        Welcome to Mukbang!
      </h1>
      {children}
    </div>
  )
}
