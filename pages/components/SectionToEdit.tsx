export const EditThis = ({ children }: any) => {
  return (
    <div className="text-red">
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
