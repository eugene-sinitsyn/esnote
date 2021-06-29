export class EsnSelectDialogModel {
  public constructor(raw?: Partial<EsnSelectDialogModel>) {
    this.title = raw?.title;
    this.options = raw?.options;
  }

  public title: string;
  public options: any[];
}