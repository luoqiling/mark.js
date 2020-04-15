declare namespace Proofread {
  export interface IData {
    content: string
    startOffset: number
    endOffset: number
    length: number
  }

  export interface IProofreadData extends IData {
    points: number[]
    key: string
    type: string
  }

  export interface IOptions {
    points?: number[]
  }

  export interface ISearchOptions {
    afterEach?(data: IProofreadData): void
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

declare class Proofread {
  constructor(textareaElem: HTMLElement | null, options?: Proofread.ConstructorOptions)

  public getContent(): string

  public innerText(): string

  public mark(type: string, options?: Proofread.IOptions): Proofread.IProofreadData

  public automark(list: Array<Proofread.IProofreadData>, options?: Proofread.ISearchOptions): void

  public create(tagName: string, options?: Proofread.CreateOptions): NodeListOf<HTMLElement>

  private textareaElem: HTMLElement

  private innerData: Proofread.IOptions

  private _mark(type: string): Proofread.IProofreadData

  private _getElems(): NodeListOf<HTMLElement>

  private _setElems(elems: NodeListOf<HTMLElement>, data: Proofread.IProofreadData): void

  private _drawExchange(data: Proofread.IProofreadData): void

  private _getData(startElem: HTMLElement, endElem: HTMLElement): Proofread.IData

  private _getRangeData(data: Proofread.IProofreadData): Proofread.IRangeData
}

export = Proofread
