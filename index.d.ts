declare namespace Mark {
  export interface IData {
    content: string
    startOffset: number
    endOffset: number
    length: number
  }

  export interface IMarkData extends IData {
    points: number[]
    key: string
    type: string
  }

  export interface IOptions {
    points?: number[]
  }

  export interface ISearchOptions {
    afterEach?(data: IMarkData): void
    after?(): void
  }

  export interface IRangeData {
    startRange: { node: Node, offset: number },
    endRange: { node: Node, offset: number }
  }

  export interface ConstructorOptions {
    tagName?: string
    debug?: boolean
  }

  export interface CreateOptions {
    selection?: Selection
  }
}

declare class Mark {
  constructor(textareaElem: HTMLElement | null, options?: Mark.ConstructorOptions)

  public getContent(): string

  public innerText(): string

  public mark(type: string, options?: Mark.IOptions): Mark.IMarkData

  public automark(list: Array<Mark.IMarkData>, options?: Mark.ISearchOptions): void

  public create(tagName?: string, options?: Mark.CreateOptions): NodeListOf<HTMLElement>

  private textareaElem: HTMLElement

  private innerData: Mark.IOptions

  private _mark(type: string): Mark.IMarkData

  private _getElems(): NodeListOf<HTMLElement>

  private _setElems(elems: NodeListOf<HTMLElement>, data: Mark.IMarkData): void

  private _drawExchange(data: Mark.IMarkData): void

  private _getData(startElem: HTMLElement, endElem: HTMLElement): Mark.IData

  private _getRangeData(startOffset: number, endOffset: number): Mark.IRangeData
}

export = Mark
