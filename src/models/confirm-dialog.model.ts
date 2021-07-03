export class EsnConfirmDialogModel {
  public constructor(raw?: Partial<EsnConfirmDialogModel>) {
    this.message = raw?.message;
    this.confirmButtonText = raw?.confirmButtonText;
  }

  public message: string;
  public confirmButtonText: string;
}