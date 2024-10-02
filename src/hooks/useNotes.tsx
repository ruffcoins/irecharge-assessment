import { useState } from "react";
import { Note } from "../interfaces/note.interface";
import { getFromLocalStorage, removeFromLocalStorage, saveToLocalStorage } from "../lib/storage";

const useNotes = () => {
  const [notes, setNotes] = useState<Note[]>(() => {
    const savedNotes = getFromLocalStorage("notes");
    return savedNotes ? savedNotes : [];
  });
  const [newNote, setNewNote] = useState("");
  const [editingNoteId, setEditingNoteId] = useState<number | null>(null);
  const [editedNoteContent, setEditedNoteContent] = useState("");

  const startEditingNote = (id: number, content: string) => {
    setEditingNoteId(id);
    setEditedNoteContent(content);
  };

  const addNote = (city: string) => {
    if (newNote.trim()) {
      const newNoteObj: Note = {
        id: Date.now(),
        content: newNote.trim()
      };
      const updatedNotes = [...notes, newNoteObj];
      setNotes(updatedNotes);
      saveToLocalStorage(`notes ${city}`, updatedNotes);
      setNewNote("");
    }
  };

  const removeNote = (id: number, city: string) => {
    const updatedNotes = notes.filter(note => note.id !== id);
    setNotes(updatedNotes);
    removeFromLocalStorage("notes");
    saveToLocalStorage(`notes ${city}`, updatedNotes);
  };

  const saveEditedNote = (id: number, city: string) => {
    const updatedNotes = notes.map(note =>
      note.id === id ? { ...note, content: editedNoteContent.trim() } : note
    );
    setNotes(updatedNotes);
    saveToLocalStorage(`notes ${city}`, updatedNotes);
    setEditingNoteId(null);
    setEditedNoteContent("");
  };

  const getNotes = (city: string): Note[] => {
    const savedNotes = getFromLocalStorage(`notes ${city}`);
    return savedNotes ? savedNotes : [];
  };

  return { saveEditedNote, removeNote, addNote, startEditingNote, editingNoteId, newNote, notes, editedNoteContent, setEditedNoteContent, setNewNote, getNotes }
}
export default useNotes