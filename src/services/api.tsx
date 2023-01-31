import axios from "axios";
import { Props } from "../components/Input";

export interface IApi {
    itens: Array<number>,
    newItens: Array<Object>
}

export interface IItem {
    item: {
        artistName: string,
        img: string,
        year: number,
        title: string,
        url: string
    }
}

export interface IItems {
    addressedValues: Array<IItem["item"]>
}

export const Api = async (input: Props["input"]) => {
    console.log("api")
    const response = (await axios.get(`https://collectionapi.metmuseum.org/public/collection/v1/search?hasImage=true&q=${input}`)).data
    const total = response.total
    const objectIDs: [] = response.objectIDs
    const itens = total > 15 ? objectIDs.slice(0, 15) : objectIDs
    return itens as IApi["itens"]
}

export const retrieveArt = async (itens: IApi["itens"]) => {
    const arrayPaitings: Array<Object> = [{}]
    itens.forEach(async (id: number) => {
        const paitingObjects = (await axios.get(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${id}`)).data
        arrayPaitings.push(paitingObjects)
    });
    console.log(arrayPaitings, "newItens")
    return arrayPaitings as IApi["newItens"]
}

export const addressingValues = (newItens: IApi["newItens"]) => {
    const arraySla: Array<IItem["item"]> = []

    newItens.forEach((elem) => {
        const item = {} as IItem["item"]
        console.log(newItens)
        const { primaryImageSmall, name, title, objectDate, objectURL }: any = elem;
        console.log("aqui", elem)
        item.artistName = name
        item.img = primaryImageSmall
        item.year = objectDate
        item.title = title
        item.url = objectURL
        console.log("item", item)
        arraySla.push(item)
        
    })
    console.log(arraySla, "arraysla")
    return arraySla as IItems["addressedValues"]
}
