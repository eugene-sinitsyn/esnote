export class EsnConfirmationDialogModel {
  public constructor(raw?: Partial<EsnConfirmationDialogModel>) {
    this.message = raw?.message;
    this.confirmButtonText = raw?.confirmButtonText;
  }

  public message: string;
  public confirmButtonText: string;
}