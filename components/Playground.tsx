export const Playground = ({ children }: any) => {
  return (
    <div className="flex flex-col">
      <div className="py-4 px-2 border border-zinc-800 min-50px w-full max-w-900px self-center h-96 rounded-xl bg-zinc-700 blue-shadow">
        {children}
      </div>
    </div>
  )
}

export default Playground
