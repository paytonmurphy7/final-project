import React from "react";

export default function CharacterCard({ char, onEdit, onDelete }) {
  function getPersonalityColor(personality) {
    const p = personality?.toLowerCase();

    if (p.includes("calm")) return "bg-blue-100 text-blue-700";
    if (p.includes("energetic")) return "bg-yellow-100 text-yellow-700";
    if (p.includes("shy")) return "bg-purple-100 text-purple-700";
    if (p.includes("aggressive")) return "bg-red-100 text-red-700";
    if (p.includes("kind")) return "bg-green-100 text-green-700";

    return "bg-slate-100 text-slate-700";
  }

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-200">

      <div className="w-full h-48 bg-slate-100 rounded-lg mb-4 overflow-hidden flex items-center justify-center">
        {char.image_url ? (
          <img
            src={char.image_url}
            alt={char.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <span className="text-slate-400">No Image</span>
        )}
      </div>

      <h2 className="text-xl font-semibold text-slate-800 mb-1">
        {char.name}
      </h2>

      <p className="text-sm text-slate-600 mb-1">
        <span className="font-medium text-blue-600">Anime:</span>{" "}
        {typeof char.anime === "string" ? char.anime : char.anime?.title}
      </p>

      <p className="text-sm text-slate-600 mb-1">
        <span className="font-medium text-blue-600">Personality:</span>{" "}
        <span
          className={
            "inline-block px-2 py-1 text-xs rounded-full " +
            getPersonalityColor(
              typeof char.personality === "string"
                ? char.personality
                : char.personality?.name
            )
          }
        >
          {typeof char.personality === "string"
            ? char.personality
            : char.personality?.name}
        </span>
      </p>

      {char.age && (
        <p className="text-sm text-slate-600 mb-1">
          <span className="font-medium text-blue-600">Age:</span> {char.age}
        </p>
      )}

      <div className="flex gap-3 mt-4">
        <button
          onClick={() => onEdit(char)}
          className="flex-1 px-3 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
        >
          Edit
        </button>

        <button
          onClick={() => onDelete(char.id)}
          className="flex-1 px-3 py-2 bg-red-600 text-white rounded-lg shadow hover:bg-red-700 transition"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
