export const EditThis = ({ children }: any) => {
  return (
    <div className="text-red-500">
      <p>
        {'<'}-------------------- EDIT THIS -------------------------{'>'}
      </p>
      <br />
      {children}
      <br />
      <p>
        {'<'}--------------------------------------------------------{'>'}
      </p>
    </div>
  )
}
