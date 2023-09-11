export type Person = {
    homeworld?: {
        name: string;
        orbitalPeriod?: string
        population?: string
    };
    filmConnection?: {
        films: {
            title: string;
            releaseDate: string;
        }[];
    };
    starshipConnection?: {
        starships: {
            name: string;
            model: string;
            starshipClass: string;
        }[];
    };
    birthYear?: string;
    height?: string;
    species?: {
        name: string;
        classification?: string

    };
    gender?: string,
    hairColor?: string,
    id?: string
    name: string
    created?: Date
};