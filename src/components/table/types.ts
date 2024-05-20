export interface TableRowI {
  time: Date,
  guess: string,
  result: number,
  order: number,
  // todo: to type color
  color: string,
  // color: PaletteColor,
  win: boolean,
}
