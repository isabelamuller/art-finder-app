import React from 'react';
import './App.css';
import { InputField, Props } from './components/Input';
import { useState } from 'react';
import Pieces from './components/List';
import { Api, retrieveArt, addressingValues } from './services/api';
import { IItem } from './services/api';



const App: React.FC = () => {
  const [input, setInput] = useState('')
  const [values, setValues] = useState<Array<IItem["item"]> >([])


  const api = async (input: Props["input"]) => {
    const itens = await Api(input)
    const newItens = await retrieveArt(itens)
    const addressedValues = addressingValues(newItens)
    setValues(addressedValues)
  }


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!input) {
      alert("O campo não pode ser vazio") // abrir um modalzitcho
      return
    }

    const newInput = input.indexOf(' ') > 0 ? input.replace(/ /g, '+') : input

    api(newInput)

  }


  return (
    <div className="App">
      <InputField input={input} setInput={setInput} handleSubmit={handleSubmit}
      />
      <Pieces addressedValues={values} />
    </div>
  );
}

export default App;
