import Playground from '../../components/Playground'
import { useState } from 'react'
import { FaPlus, FaCheckCircle } from 'react-icons/fa'

const color_list = [
  '#248BF5',
  '#257EED',
  '#2772E4',
  '#2865DC',
  '#2958D4',
  '#2B4CCB',
  '#2C3FC3',
  '#2E33BA',
  '#2F26B2',
  '#3019AA',
  '#320DA1',
  '#330099',
]

export const TextIrony = () => {
  const [addIcon, updateAddIcon] = useState(false)
  const [addClicked, updateAddClicked] = useState(false)
  const [sarcasm, updateSarcasm] = useState(1)
  console.log({ addClicked })

  const messageColor = color_list[Math.floor(sarcasm / color_list.length)]
  console.log('Message color:', messageColor)

  return (
    <Playground>
      <div className="text-secondary text-center text-2xl">
        Concept for Adding Sarcasm to Messages
      </div>
      <div className="text-zinc-400 text-center text-lg mt-0.5">
        Click the message
      </div>
      <div className="imessage mt-8 mx-auto items-end">
        <p
          style={{ backgroundColor: messageColor }}
          className="imessage-from max-w-250px mt-12 z-50"
          onClick={() => {
            updateAddIcon(!addIcon && !addClicked)
            updateAddClicked(false)
          }}
        >
          An example text.{' '}
        </p>
        {addIcon && (
          <div
            className="relative right-40 bottom-14 z-50"
            onClick={() => {
              updateAddClicked(true)
              updateAddIcon(false)
            }}
          >
            <AddIcon />
          </div>
        )}
        {addClicked && (
          <div className="fade-in-quick relative rounded-xl bg-gray-700 max-w-250px bottom-5 right-0.5 z-30 h-24 px-2">
            <div className="flex flex-row mt-6">
              <p className="text-sm text-center font-thin ml-10 mr-4 text-white">
                Add Sarcasm
              </p>
              <FaCheckCircle
                size={15}
                className="ml-auto mt-0.5 imessage-color hover:text-blue-600"
                onClick={() => updateAddClicked(false)}
              />
            </div>
            <input
              type="range"
              min="1"
              max="100"
              value={sarcasm}
              className="w-full relative bottom-1 text-secondary"
              onChange={(e) => updateSarcasm(parseInt(e.target.value))}
            />
            <div className="flex flex-row text-xs justify-between font-thin text-white relative bottom-2.5 px-0.5">
              <p>Serious</p>
              <p>Ironic</p>
              <p>Post-Ironic</p>
            </div>
          </div>
        )}
      </div>
    </Playground>
  )
}

const AddIcon = () => {
  return (
    <div className="fade-in-quick rounded-2xl w-8 h-8 bg-gray-400 border border-gray-500 items-center pt-1.5">
      <FaPlus color="#333" className="mx-auto" />
    </div>
  )
}

export default TextIrony
