import React, { useState } from "react";
import { createCharacter, updateCharacter, deleteCharacter } from "../api.js";

export default function CharacterForm({
  initialItem = null,
  animeList,
  personalities,
  onSave,
  onCancel,
}) {
  const [formData, setFormData] = useState(
    initialItem || {
      name: "",
      anime: "",
      personality: "",
      age: "",
      power: "",
      description: "",
      image: "",
    }
  );

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (initialItem) {
      await updateCharacter(initialItem.id, formData);
    } else {
      await createCharacter(formData);
    }

    onSave();
  }

  async function handleDelete() {
    if (initialItem) {
      await deleteCharacter(initialItem.id);
      onSave();
    }
  }

  return (
    <section className="max-w-2xl mx-auto bg-white rounded-2xl shadow-lg border border-slate-200 p-8">

      <h2 className="text-2xl font-bold text-slate-800 mb-6">
        {initialItem ? "Edit Character" : "Add New Character"}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5">

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1">
            Image URL
          </label>
          <input
            type="text"
            name="image"
            value={formData.image}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg border border-slate-300 shadow-sm focus:ring-2 focus:ring-blue-400"
            placeholder="https://example.com/image.jpg"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1">
            Character Name
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 rounded-lg border border-slate-300 shadow-sm focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1">
            Anime Series
          </label>
          <select
            name="anime"
            value={formData.anime}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 rounded-lg border border-slate-300 shadow-sm bg-white focus:ring-2 focus:ring-blue-400"
          >
            <option value="">Select Anime</option>
            {animeList.map((a) => (
              <option key={a.id} value={a.title}>
                {a.title}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1">
            Personality
          </label>
          <select
            name="personality"
            value={formData.personality}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 rounded-lg border border-slate-300 shadow-sm bg-white focus:ring-2 focus:ring-blue-400"
          >
            <option value="">Select Personality</option>
            {personalities.map((p) => (
              <option key={p.id} value={p.name}>
                {p.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1">
            Age
          </label>
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg border border-slate-300 shadow-sm focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1">
            Power / Ability
          </label>
          <input
            type="text"
            name="power"
            value={formData.power}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg border border-slate-300 shadow-sm focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1">
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full px-4 py-2 h-28 rounded-lg border border-slate-300 shadow-sm focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div className="flex gap-3 pt-4">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 bg-slate-300 text-slate-800 rounded-lg shadow hover:bg-slate-400 transition"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="px-5 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
          >
            Save
          </button>

          {initialItem && (
            <button
              type="button"
              onClick={handleDelete}
              className="ml-auto px-4 py-2 bg-red-600 text-white rounded-lg shadow hover:bg-red-700 transition"
            >
              Delete Character
            </button>
          )}
        </div>
      </form>
    </section>
  );
}
