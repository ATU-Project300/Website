export interface Game {
    _id: string,
    title: string,
    year: number,
    description: string,
    image: string,
    consoles: string,
    emulator: string,
    rating: number[],
    isChecked: boolean[],
    checkedIndex: number,
    averageRating: number,
    totalUserRating: number
}