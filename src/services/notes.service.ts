import { moveItemInArray } from '@angular/cdk/drag-drop';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { EsnListModel } from 'src/models/list.model';
import { EsnNoteModel } from 'src/models/note.model';

@Injectable({ providedIn: 'root' })
export class EsnNotesService {
  public constructor() { this.readFromLocalStorage(); }

  private readonly localStorageKey: string = 'esnLists';
  private readonly listsSubject: BehaviorSubject<EsnListModel[]> =
    new BehaviorSubject<EsnListModel[]>([]);
  public readonly lists$: Observable<EsnListModel[]> = this.listsSubject.asObservable();

  private lists: EsnListModel[] = [];

  public createList(list: EsnListModel): void {
    this.lists.push(list);
    this.saveChangesToLocalStorage();
  }

  public updateList(index: number, list: EsnListModel): void {
    this.verifyExists(this.lists, index);
    this.lists[index] = list;
    this.saveChangesToLocalStorage();
  }

  public removeList(index: number): void {
    this.verifyExists(this.lists, index);
    this.lists.splice(index, 1);
    this.saveChangesToLocalStorage();
  }

  public reorderList(indexFrom: number, indexTo: number): void {
    this.verifyExists(this.lists, indexFrom);
    this.verifyExists(this.lists, indexTo);
    moveItemInArray(this.lists, indexFrom, indexTo);
    this.saveChangesToLocalStorage();
  }

  public createNote(listIndex: number, note: EsnNoteModel): void {
    this.verifyExists(this.lists, listIndex);
    if (!this.lists[listIndex].notes) this.lists[listIndex].notes = [];
    this.lists[listIndex].notes.unshift(note);
    this.saveChangesToLocalStorage();
  }

  public updateNote(listIndex: number, noteIndex: number, note: EsnNoteModel): void {
    this.verifyExists(this.lists, listIndex);
    this.verifyExists(this.lists[listIndex].notes, noteIndex);
    this.lists[listIndex].notes[noteIndex] = note;
    this.saveChangesToLocalStorage();
  }

  public removeNote(listIndex: number, noteIndex: number): void {
    this.verifyExists(this.lists, listIndex);
    this.verifyExists(this.lists[listIndex].notes, noteIndex);
    this.lists[listIndex].notes.splice(noteIndex, 1);
    this.saveChangesToLocalStorage();
  }

  public reorderNote(listIndex: number, noteIndexFrom: number, noteIndexTo: number): void {
    this.verifyExists(this.lists, listIndex);
    this.verifyExists(this.lists[listIndex].notes, noteIndexFrom);
    this.verifyExists(this.lists[listIndex].notes, noteIndexTo);
    moveItemInArray(this.lists[listIndex].notes, noteIndexFrom, noteIndexTo);
    this.saveChangesToLocalStorage();
  }

  public moveNote(listIndexFrom: number, noteIndex: number, listIndexTo: number): void {
    this.verifyExists(this.lists, listIndexFrom);
    this.verifyExists(this.lists[listIndexFrom].notes, noteIndex);
    this.verifyExists(this.lists, listIndexTo);
    const note = this.lists[listIndexFrom].notes.splice(noteIndex, 1)[0];
    if (!this.lists[listIndexTo].notes) this.lists[listIndexTo].notes = [];
    this.lists[listIndexTo].notes.unshift(note);
    this.saveChangesToLocalStorage();
  }

  private verifyExists(array: any[], index: number) {
    if (index >= array.length) new Error('Not found');
  }

  private readFromLocalStorage(): void {
    const serializedLists = localStorage.getItem(this.localStorageKey);
    const rawLists = JSON.parse(serializedLists);
    if (!Array.isArray(rawLists)) this.lists = [];
    else this.lists = rawLists.map(rawList => new EsnListModel(rawList));
    this.listsSubject.next(this.lists);
  }

  private saveChangesToLocalStorage(): void {
    const serializedLists = JSON.stringify(this.lists ?? []);
    localStorage.setItem(this.localStorageKey, serializedLists);
    this.listsSubject.next(this.lists);
  }
}