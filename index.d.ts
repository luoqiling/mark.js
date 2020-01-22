interface IData {
  content: string
  startOffset: number
  endOffset: number
  length: number
}

interface ISearchOptions {
  afterEach?(data: IProofreadData): void
  after?(): void
}

interface IMarkOptions {
  points?: number[]
}

interface IRangeData {
  startRange: { node: Node, offset: number },
  endRange: { node: Node, offset: number }
}

export interface IProofreadData extends IData {
  points: number[]
  key: number
  type: string
}

export interface IProofread {
  getContent(): string

  innerText(): string

  mark(type: string, options?: IMarkOptions): Promise<IProofreadData>

  markAll(list: Array<IProofreadData>, options?: ISearchOptions): void

  _mark(type: string): Promise<IProofreadData>

  _getElems(): NodeListOf<HTMLFontElement>

  _setElems(elems: NodeListOf<HTMLFontElement>, data: IProofreadData): void

  _drawExchange(data: IProofreadData): void

  _getData(startElem: HTMLFontElement, endElem: HTMLFontElement): IData

  _getRangeData(data: IProofreadData): IRangeData
}

interface IProofreadConstructor {
  new (textareaElem: HTMLElement | null): IProofread
}

declare const Proofread: IProofreadConstructor

export default Proofread
