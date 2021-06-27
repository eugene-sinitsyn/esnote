export class EsnNoteModel {
  public constructor(raw?: Partial<EsnNoteModel>) {
    this.name = raw?.name;
    this.text = raw?.text;
  }

  public name: string;
  public text: string;

  public toString(): string {
    return this.name ?? '';
  }
}