export class EsnInputDialogModel {
  public constructor(raw?: Partial<EsnInputDialogModel>) {
    this.name = raw?.name;
    this.value = raw?.value;
    this.maxLength = raw?.maxLength;
  }

  public name: string;
  public value: string;
  public maxLength: number;
  public submitButtonText: string;
}