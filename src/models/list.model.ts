import { EsnNoteModel } from './note.model';

export class EsnListModel {
  public constructor(raw?: Partial<EsnListModel>) {
    this.name = raw?.name;
    if (Array.isArray(raw?.notes))
      this.notes = raw.notes.map(rawNote => new EsnNoteModel(rawNote));
  }

  public name: string;
  public notes: EsnNoteModel[];

  public toString(): string {
    return this.name ?? '';
  }
}