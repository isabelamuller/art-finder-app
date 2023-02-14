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
import Header from './components/Header';
import { ThemeContext } from './components/contexts/theme-context';
import Filter from './components/Filter/FilterResults';
import Loader from './components/Loader';
import {AiOutlineClear} from "react-icons/ai"

const App: React.FC = () => {
  const [input, setInput] = useState('')
  const [values, setValues] = useState<Array<IItem["item"]>>([])
  const oldInput = input
  const validObjects: Array<Object> = [{}]
  const { isOpenHowTo, toggleHowTo } = useModalHowTo()
  const { isOpenSettings, toggleSettings } = useModalSettings()
  const [theme, setTheme] = useState('light')
  const [filterName, setFilterName] = useState('')
  const [isLoading, setIsLoading] = useState<boolean>();

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
    setValues([])
    if (itens === null) {
      window.alert("Artist not found")
    } else {
      const newItens = await retrieveArt(itens)
      const validArtist = checkArtists(newItens, oldInput, validObjects)
      const addressedValues = addressingValues(validArtist)
      const newArray = await removeEmptyObjects(addressedValues)
      setValues(newArray)
    }
    setIsLoading(false); 
  }
  

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true);
    

    if (!input) {
      alert("O campo não pode ser vazio")
      return
    }


    const newInput = input.indexOf(' ') > 0 ? input.replace(/ /g, '+') : input

    api(newInput, oldInput, validObjects)


  }

  const filterYearOldtoNew = () => {
      const n = values.sort((a, b) => a.year - b.year)
      setValues([...n])
  }
  const filterYearNewtoOld = () => {
      const n = values.sort((a, b) => b.year - a.year)
      setValues([...n])
  }

  const filterTitle = () => {
      const n = values.sort((a,b) => a.title > b.title ? 1 : -1)
      setValues([...n])
  }

  useEffect(()=> {
    toggleFilter()
    console.log(filterName)
  }, [filterName])

  const toggleFilter = () => {
    switch (filterName) {

      case "Year-Old-New":
        filterYearOldtoNew()
        break;

      case "Year-New-Old":
        filterYearNewtoOld()
        break;

      case "Artist":
        console.log("lili")
        break;

      case "Title":
        filterTitle()
        break;
    }
  }
  
  const handleClear = () => {
    setValues([])
    setFilterName("")
  }
  console.log(values, "values")
  
  // const handleClick = async (selectedArtistName:ISingle["name"]) => {
  //   console.log("ta aq")
  //   console.log(selectedArtistName)
  
  //   console.log(input)
  //   const itens = await Api(input)
  //   const newItens = await retrieveArt(itens)
  //   const validArtist = checkArtists(newItens, oldInput, validObjects)
  //   const addressedValues = addressingValues(validArtist)
  //   const newArray = await removeEmptyObjects(addressedValues)
  //   setValues(newArray)
  // }
  
  
  
  // criar novo arquivo p nome do artista e podendo dar like etc 
  //settings: darkmode e idioma ate agora
  // salvar no cache n sei cm
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={`App ${theme}-theme`}>
        <div className='App-Container'>
          <div className='App-Wrapper'>
            <div className='Modal-Btns-Container'>
              <Header />
              <div className='Modal-Btns'>
                <BsQuestionLg onClick={toggleHowTo} className={`Modal-btn-howto ${theme}-theme`} />
                <FcSettings onClick={toggleSettings} className={`Modal-Btn-Settings  ${theme}-theme`} />
              </div>
            </div>
            <div className={`input-wrapper  ${theme}-theme`}>
              <ModalHowTo isOpenHowTo={isOpenHowTo} toggleHowTo={toggleHowTo}>
                <HowToContent />
              </ModalHowTo>
              <ModalSettings isOpenSettings={isOpenSettings} toggleSettings={toggleSettings}>
                <SettingsContent />
              </ModalSettings>
              <div className='Art-Wrapper'>
                <div className="Filter-and-Clear">
                <Filter filterName={filterName} setFilterName={setFilterName} />
                <AiOutlineClear className='Clear-Btn' onClick={handleClear}/>
                </div>
                {isLoading ? <Loader/> : <Pieces addressedValues={values}/>}
              
              </div>
              <InputField input={input} setInput={setInput} handleSubmit={handleSubmit} oldInput={oldInput} validObjects={validObjects} />
            </div>
          </div>
        </div>
      </div>
    </ThemeContext.Provider>
  );
}

export default App;
