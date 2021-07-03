import { moveItemInArray } from '@angular/cdk/drag-drop';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { EsnListModel } from '../models/list.model';
import { EsnNoteModel } from '../models/note.model';

@Injectable({ providedIn: 'root' })
export class EsnNotesService {
  public constructor() { this.readFromLocalStorage(); }

  private readonly localStorageKey: string = 'esnNotes';
  private readonly listsSubject: BehaviorSubject<EsnListModel[]> =
    new BehaviorSubject<EsnListModel[]>([]);
  private readonly saveSubject: Subject<void> = new Subject<void>();
  public readonly lists$: Observable<EsnListModel[]> = this.listsSubject.asObservable();
  public readonly save$: Observable<void> = this.saveSubject.asObservable();
  public readonly empty$: Observable<boolean> = this.lists$.pipe(map(lists => !lists?.length));

  private listsValue: EsnListModel[] = [];
  public get lists(): EsnListModel[] { return this.listsValue; }
  public get empty(): boolean { return !this.listsValue?.length; }

  public createList(list: EsnListModel): void {
    this.listsValue.unshift(list);
    this.saveChangesToLocalStorage();
  }

  public renameList(index: number, listName: string): void {
    this.verifyExists(this.listsValue, index);
    this.listsValue[index].name = listName;
    this.saveChangesToLocalStorage();
  }

  public removeList(index: number): void {
    this.verifyExists(this.listsValue, index);
    this.listsValue.splice(index, 1);
    this.saveChangesToLocalStorage();
  }

  public reorderList(fromIndex: number, toIndex: number): void {
    if (fromIndex === toIndex) return;
    this.verifyExists(this.listsValue, fromIndex);
    this.verifyExists(this.listsValue, toIndex);
    moveItemInArray(this.listsValue, fromIndex, toIndex);
    this.saveChangesToLocalStorage();
  }

  public createNote(listIndex: number, note: EsnNoteModel): void {
    this.verifyExists(this.listsValue, listIndex);
    if (!this.listsValue[listIndex].notes) this.listsValue[listIndex].notes = [];
    this.listsValue[listIndex].notes.unshift(note);
    this.saveChangesToLocalStorage();
  }

  public updateNote(listIndex: number, noteIndex: number, note: EsnNoteModel): void {
    this.verifyExists(this.listsValue, listIndex);
    this.verifyExists(this.listsValue[listIndex].notes, noteIndex);
    this.listsValue[listIndex].notes[noteIndex] = note;
    this.saveChangesToLocalStorage();
  }

  public removeNote(listIndex: number, noteIndex: number): void {
    this.verifyExists(this.listsValue, listIndex);
    this.verifyExists(this.listsValue[listIndex].notes, noteIndex);
    this.listsValue[listIndex].notes.splice(noteIndex, 1);
    this.saveChangesToLocalStorage();
  }

  public reorderNote(listIndex: number, fromNoteIndex: number, toNoteIndex: number): void {
    if (fromNoteIndex === toNoteIndex) return;
    this.verifyExists(this.listsValue, listIndex);
    this.verifyExists(this.listsValue[listIndex].notes, fromNoteIndex);
    this.verifyExists(this.listsValue[listIndex].notes, toNoteIndex);
    moveItemInArray(this.listsValue[listIndex].notes, fromNoteIndex, toNoteIndex);
    this.saveChangesToLocalStorage();
  }

  public moveNote(listIndexFrom: number, noteIndex: number, listIndexTo: number): void {
    this.verifyExists(this.listsValue, listIndexFrom);
    this.verifyExists(this.listsValue[listIndexFrom].notes, noteIndex);
    this.verifyExists(this.listsValue, listIndexTo);
    const note = this.listsValue[listIndexFrom].notes.splice(noteIndex, 1)[0];
    if (!this.listsValue[listIndexTo].notes) this.listsValue[listIndexTo].notes = [];
    this.listsValue[listIndexTo].notes.unshift(note);
    this.saveChangesToLocalStorage();
  }

  private verifyExists(array: any[], index: number) {
    if (index >= array.length) new Error('Not found');
  }

  private readFromLocalStorage(): void {
    const serializedLists = localStorage.getItem(this.localStorageKey);
    const rawLists = JSON.parse(serializedLists);
    if (!Array.isArray(rawLists)) this.listsValue = [];
    else this.listsValue = rawLists.map(rawList => new EsnListModel(rawList));
    this.listsSubject.next(this.listsValue);
  }

  private saveChangesToLocalStorage(): void {
    const serializedLists = JSON.stringify(this.listsValue);
    localStorage.setItem(this.localStorageKey, serializedLists);
    this.listsSubject.next(this.listsValue.map(list => new EsnListModel(list)));
    this.saveSubject.next();
  }
}