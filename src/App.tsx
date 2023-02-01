import React from 'react';
import './App.css';
import { InputField, Props } from './components/Input';
import { useState } from 'react';
import Pieces from './components/List';
import { Api, retrieveArt, addressingValues, checkArtists } from './services/api';
import { IItem } from './services/api';


const App: React.FC = () => {
  const [input, setInput] = useState('')
  const [values, setValues] = useState<Array<IItem["item"]>>([])
  // const [isOpen, setIsOpen] = useState<boolean>(false)
  let oldInput:string = input
  
  const api = async (input: Props["input"], oldInput:Props["oldInput"]) => {
    const itens = await Api(input)
    const newItens = await retrieveArt(itens)
    const valid = await checkArtists(newItens, oldInput)

    const addressedValues = addressingValues(valid)
    setValues(addressedValues)
    
  }
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // const Modal = () => {
    //   setIsOpen(true)

    //   return (
    //     <div className='Modal'>
    //       <h1 className='modal-text'>The field can't be blank!</h1>
    //       <button
    //         onClick={() => setIsOpen(false)}
    //         className="modal-btn">
    //         close
    //       </button>
    //     </div>
    //   )
    // }
    
    if (!input) {
      alert("O campo não pode ser vazio") // abrir um modalzitcho
      return
    }
    
    
    const newInput = input.indexOf(' ') > 0 ? input.replace(/ /g, '+') : oldInput
    console.log("input", newInput)

    const capitalizeWord = () => {
      const newOldInput= oldInput
      .toLowerCase()
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
        oldInput = newOldInput
      };


      capitalizeWord()
      console.log(oldInput, "tem q dar")
    api(newInput, oldInput)

  }
// criar novo componente p nome do artista e podendo dar like etc 

  return (
    <div className="App">
    <div className='input-wrapper'>
      <InputField input={input} setInput={setInput} handleSubmit={handleSubmit} oldInput={oldInput}
      />
    </div>
      <Pieces addressedValues={values} />
    </div>
  );
}

export default App;
