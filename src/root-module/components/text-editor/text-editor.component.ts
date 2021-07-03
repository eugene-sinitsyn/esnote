import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit, Self } from '@angular/core';
import { ControlValueAccessor, FormControl, NgControl } from '@angular/forms';
import { MatFormFieldControl } from '@angular/material/form-field';
import { Editor, Validators } from 'ngx-editor';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'esn-text-editor',
  templateUrl: './text-editor.component.html',
  styleUrls: ['./text-editor.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{ provide: MatFormFieldControl, useExisting: EsnTextEditorComponent }]
})
export class EsnTextEditorComponent
implements ControlValueAccessor, MatFormFieldControl<string>, OnInit, OnDestroy {
  public constructor(
    @Self() public readonly ngControl: NgControl,
    private readonly changeDetectorRef: ChangeDetectorRef
  ) { ngControl.valueAccessor = this; }

  private readonly subscription: Subscription = new Subscription();
  public readonly controlType: string = 'rich-text';
  public readonly editor: Editor = new Editor();

  private requiredValue: boolean = false;
  public focused: boolean = false;

  @Input() public id: string = 'esn-text-editor';
  @Input() public placeholder: string = '';
  @Input() public set required(value: any) {
    this.requiredValue = coerceBooleanProperty(value);
  } public get required() { return this.requiredValue; }

  public set value(value: string) { this.formControl.setValue(value); }
  public get value(): string { return this.formControl.value; }

  public get formControl(): FormControl { return this.ngControl.control as FormControl; }
  public get stateChanges(): Observable<void> { return this.formControl.valueChanges; }
  public get empty(): boolean { return !!Validators.required()(this.formControl); }
  public get shouldLabelFloat() { return this.focused || !this.empty; }
  public get disabled(): boolean  { return this.formControl.disabled; }
  public get errorState(): boolean {
    return this.formControl.touched && this.formControl.invalid;
  }

  public ngOnInit(): void {
    this.subscription.add(
      this.editor.update.subscribe(() => this.changeDetectorRef.markForCheck())
    );
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.editor.destroy();
  }

  public writeValue(value: any): void {}
  public registerOnTouched(handler: any): void {}
  public setDisabledState(value: boolean): void {}
  public registerOnChange(handler: any): void {}

  public setDescribedByIds(ids: string[]): void {}
  public onContainerClick(event: MouseEvent): void {
    const target = (event.target as HTMLElement);
    if ( // exclude menu
      target?.id === this.id ||
      target?.classList?.contains('mat-form-field-infix') ||
      target?.classList?.contains('mat-form-field-flex')
    ) this.editor.view.focus();
  }
}