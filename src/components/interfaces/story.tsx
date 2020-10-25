export interface IStory {
    by?: string,
    descendants?: number,
    id: number,
    kids: number[],
    score: number,
    text: string,
    title: string,
    time?: number,
    type: string,
    url?: string
}