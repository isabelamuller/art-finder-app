import axios from "axios";
import { Props } from "../components/Input";

export interface IApi {
    itens: Array<number>,
    newItens: Array<Object>
    artistObject: Array<Object>

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

// se o artista tem menos de 15 obras, mostrar so as que tem
// acho que primeiro validar o nome. pegar so as obras que sao do artista e depois
// iterar sobre todas pra ver se tem foto. priorizar as com foto mas se nenhuma tiver
// vide claude monet, botar uma foto padrao

export const checkArtists = async (newItens: IApi["newItens"], oldInput: Props["oldInput"]) => {
    const validArtist: Array<Object> = [{}]
    const newInput = oldInput.toUpperCase()

    newItens.forEach((elem) => {
        const { artistDisplayName }: any = elem;
        const newString: string = artistDisplayName.toUpperCase()

        if (newString === newInput) {
            validArtist.push(elem)
            console.log("eh igual", "input: ", newInput, "na api: ", newString)
        } else {
            console.log("NAO eh igual", "input: ", newInput, "na api: ", newString)
        }
        console.log(newString)
    })
    
    return validArtist as IApi["artistObject"]
}

// const validArtist: Array<Object> = [{}]
//  const validObjects: Array<Object> = [{}]

// newItens.forEach((elem) => {
//     const { artistDisplayName }: any = elem;
//     if (artistDisplayName === oldInput) {
//         validArtist.push(elem)
//     } else {
//         return null
//     }
//     return validArtist
// })
// console.log(validArtist, "vald")

// validArtist.forEach((elem)=> {
//     const {primaryImageSmall}: any = elem
//     if (primaryImageSmall !== "") {
//         validObjects.push(elem)
//     } else {
//         return null
//     }
//     return validObjects
// })
// console.log(validObjects, "validObjects")
// return validObjects as IApi["artistObject"]


export const addressingValues = (artistObject: IApi["artistObject"]) => {
    const arrayItens: Array<IItem["item"]> = []
    console.log(artistObject, "dentro do addressing")

    artistObject.forEach((elem) => {
        const item = {} as IItem["item"]
        const { primaryImageSmall, artistDisplayName, title, objectDate, objectURL }: any = elem;
        item.artistName = artistDisplayName
        item.img = primaryImageSmall
        item.year = objectDate
        item.title = title
        item.url = objectURL
        arrayItens.push(item)

    })
    return arrayItens as IItems["addressedValues"]
}
