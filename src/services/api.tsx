import axios from "axios";
import { Props } from "../components/Input";
import { ReactNode } from "react";


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
    handleClear?: () => void,
    children?: ReactNode,
    addressedValues: Array<IItem["item"]>
}

export const Api = async (input: Props["input"] ) => {
    const response = (await axios.get(`https://collectionapi.metmuseum.org/public/collection/v1/search?hasImage=true&q=${input}`)).data
    const total = response.total
    const objectIDs: [] = response.objectIDs
    const itens = total > 100 ? objectIDs.slice(0, 100) : objectIDs
    return itens as IApi["itens"]
}

export const retrieveArt = async (itens: IApi["itens"]) => {

    const arrayPaitings: Array<Object> = []

    await Promise.all(itens.map(async (id: number) => {
        try {
            const paitingObjects = (await axios.get(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${id}`)).data
            arrayPaitings.push(paitingObjects)
        } catch (err) {
            return null
        }
    }));

    return arrayPaitings as IApi["newItens"]
}


export const checkArtists = (newItens: IApi["newItens"], oldInput: Props["oldInput"], validObjects: Props["validObjects"]) => {
    const validArtist: Array<Object> = [{}]
    const newInput = oldInput.toUpperCase()

    newItens.forEach((elem) => {
        const { artistDisplayName }: any = elem;
        const newString: string = artistDisplayName.toUpperCase()

        if (newString === newInput) {
            validArtist.push(elem)
        }
        return validArtist as IApi["newItens"]
    })

    validArtist.forEach((elem) => {
        let { primaryImageSmall }: any = elem

        if (primaryImageSmall !== "") {
            validObjects.push(elem)
        }
        return validObjects
    })

    if (validObjects.length < 15) {
        const noImageObjects = validArtist.slice(0, 15)
        noImageObjects.forEach((elem) => {
            validObjects.push(elem)
        })

    }

    return validObjects as Props["validObjects"]


}

export const addressingValues = (validObjects: Props["validObjects"]) => {
    const arrayItens: Array<IItem["item"]> = []
    validObjects.forEach((elem) => {
        const item = {} as IItem["item"]
        const { primaryImageSmall, artistDisplayName, title, objectDate, objectURL }: any = elem;
        item.artistName = artistDisplayName
        if (primaryImageSmall === "") {
            item.img = "https://i.postimg.cc/pdf2FhnS/image-2023-02-02-002050989.png"
        } else {
            item.img = primaryImageSmall
        }
        item.year = objectDate
        item.title = title
        item.url = objectURL
        arrayItens.push(item)

    })
    return arrayItens as IItems["addressedValues"]
}

export const removeEmptyObjects = async (validObjects: Props["validObjects"]) => {
    const newArray: Array<Object> = [{}]
     validObjects.forEach((elem) => {
        const { artistName }:any = elem
        if(artistName !== undefined) {
            newArray.push(elem)
        } 
        return newArray
    })
    const noEmptyObjects = newArray.filter(value=>Object.keys(value).length !== 0)
   
    return noEmptyObjects as IItems["addressedValues"]
}
