export type link = {
    to: string,
    link: string | JSX.Element,
}
export interface ICharacterCard {
    created: string
    episode: any[]
    gender: string
    id: number
    image: string
    location: {
        name: string
        url: string
    }
    name: string
    origin: {
        name: string
        url: string
    }
    species: string
    status: string
    type: string
    url: string
}
