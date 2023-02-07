import React from 'react';
import './App.css';
import { InputField, Props } from './components/Input';
import { useState, useEffect } from 'react';
import Pieces from './components/List';
import { Api, retrieveArt, addressingValues, checkArtists, removeEmptyObjects } from './services/api';
import { IItem } from './services/api';
import { ModalHowTo, ModalSettings } from './components/Modal/Modal';
import { useModalHowTo, useModalSettings } from './components/Modal/useModal';
import { HowToContent, SettingsContent } from './components/Modal/ModalContent';
import { BsQuestionLg } from "react-icons/bs"
import { FcSettings } from "react-icons/fc"
// import Header from './components/Header';
import { ThemeContext } from './components/contexts/theme-context';
import RecArtists from './components/RecArtists/RecArtists';
import { ISingle } from './components/RecArtists/SingleArtists';


const App: React.FC = () => {
  const [input, setInput] = useState('')
  const [values, setValues] = useState<Array<IItem["item"]>>([])
  const oldInput = input
  const validObjects: Array<Object> = [{}]
  const { isOpenHowTo, toggleHowTo } = useModalHowTo()
  const { isOpenSettings, toggleSettings } = useModalSettings()
  const [theme, setTheme] = useState('light')


  const toggleTheme = () => {
    if (theme === 'dark') {
      setTheme('light');
      localStorage.setItem('theme', 'light')
    } else {
      setTheme('dark');
      localStorage.setItem('theme', 'dark')
    }
  }

  useEffect(() => {
    const themeLocal = localStorage.getItem('theme');
    if (themeLocal) {
      setTheme(themeLocal);
    }
  }, [])

  const api = async (input: Props["input"], oldInput: Props["oldInput"], validObjects: Props["validObjects"]) => {
    const itens = await Api(input)
    if (itens === null) {
      window.alert("Artist not found")
    } else {
      const newItens = await retrieveArt(itens)
      const validArtist = checkArtists(newItens, oldInput, validObjects)
      const addressedValues = addressingValues(validArtist)
      const newArray = await removeEmptyObjects(addressedValues)
      setValues(newArray)
    }
  }


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()


    if (!input) {
      alert("O campo não pode ser vazio")
      // setIsOpen(true)// abrir um modalzitcho
      return
    }


    const newInput = input.indexOf(' ') > 0 ? input.replace(/ /g, '+') : input

    api(newInput, oldInput, validObjects)

    while (values.length === 0) {
      console.log("carregando")
      break;
    }

  }

  const handleClick:React.MouseEventHandler<HTMLDivElement>  = async (selectedArtistName:ISingle["name"]) => {
    setInput(selectedArtistName)
    console.log(input)
    console.log("entrou")
    const itens = await Api(input)
    const newItens = await retrieveArt(itens)
    const validArtist = checkArtists(newItens, oldInput, validObjects)
    const addressedValues = addressingValues(validArtist)
    const newArray = await removeEmptyObjects(addressedValues)
    setValues(newArray)
  }



  // criar novo arquivo p nome do artista e podendo dar like etc 
  //settings: darkmode e idioma ate agora
  //footer: meu insta meu github meu linkedin logo da dws
  // salvar no cache n sei cm
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={`App ${theme}-theme`}>
        <div className={`input-wrapper  ${theme}-theme`}>
          <div className='Modal-Btns'>
            <div className='how-to-modal'>
              <BsQuestionLg onClick={toggleHowTo} className={`Modal-btn-howto ${theme}-theme`} />
            </div>
            <div className='settings-modal'>
              <FcSettings onClick={toggleSettings} className={`Modal-Btn-Settings  ${theme}-theme`} />
            </div>

          </div>
          <InputField input={input} setInput={setInput} handleSubmit={handleSubmit} oldInput={oldInput} validObjects={validObjects}
          />
        </div>
        <RecArtists handleClick={handleClick}/>
        <ModalHowTo isOpenHowTo={isOpenHowTo} toggleHowTo={toggleHowTo}>
          <HowToContent />
        </ModalHowTo>
        <ModalSettings isOpenSettings={isOpenSettings} toggleSettings={toggleSettings}>
          <SettingsContent />
        </ModalSettings>
        {/* <button onClick={handleDelete}>aqui</button> */}
        <Pieces addressedValues={values}>
          {/* <Header input={input}/> */}
        </Pieces>
      </div>
    </ThemeContext.Provider>
  );
}

export default App;
