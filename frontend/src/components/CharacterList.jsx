import React from "react";
import CharacterCard from "./CharacterCard.jsx";

export default function CharacterList({ characters, onEdit, onDelete }) {
  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {characters.map((char) => (
        <CharacterCard
          key={char.id}
          char={char}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </section>
  );
}
