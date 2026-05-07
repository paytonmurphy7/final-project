import React, { useState } from "react";
import { createCharacter, updateCharacter, deleteCharacter } from "../api.js";
import { getToken } from "../tokenStorage";

export default function CharacterForm({
  initialItem = null,
  animeList,
  personalities,
  onSave,
  onCancel,
}) {

  const cleanedItem = initialItem
    ? {
        ...initialItem,
        anime: initialItem.anime?.id || "",
        personality: initialItem.personality?.id || "",
      }
    : null;

  const [formData, setFormData] = useState(
    cleanedItem || {
      name: "",
      anime: "",
      personality: "",
      age: "",
      description: "",
      image_url: "",
    }
  );

  const [imageError, setImageError] = useState(false);

  const blockedHost = (url) => {
    if (!url) return false;
    const lower = url.toLowerCase();
    return (
      lower.includes("pinterest") ||
      lower.includes("pinimg") ||
      lower.includes("instagram") ||
      lower.includes("fbcdn") ||
      lower.includes("googleusercontent")
    );
  };

  function handleChange(e) {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]:
        name === "anime" ||
        name === "personality" ||
        name === "age"
          ? Number(value)
          : value,
    });

    if (name === "image_url") {
      setImageError(false); 
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const token = getToken();
    if (!token) {
      alert("You must be logged in to add or edit characters.");
      return;
    }

    if (initialItem) {
      await updateCharacter(initialItem.id, formData);
    } else {
      await createCharacter(formData);
    }

    onSave();
  }

  async function handleDelete() {
    const token = getToken();
    if (!token) {
      alert("You must be logged in to delete characters.");
      return;
    }

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
            name="image_url"
            value={formData.image_url}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg border border-slate-300 shadow-sm focus:ring-2 focus:ring-blue-400"
            placeholder="https://example.com/image.jpg"
          />

          <p className="text-xs text-slate-500 mt-1">
            Tip: Use an image URL from Imgur or Imgbb. Pinterest/Instagram links won’t load.
          </p>

          {blockedHost(formData.image_url) && (
            <p className="text-xs text-red-500 mt-1">
              This site blocks image embedding. Try uploading to Imgur instead.
            </p>
          )}

          {formData.image_url && !blockedHost(formData.image_url) && (
            <div className="mt-3">
              <p className="text-xs text-slate-600 mb-1">Preview:</p>
              <img
                src={formData.image_url}
                alt="Preview"
                onError={() => setImageError(true)}
                className="w-40 h-40 object-cover rounded-lg border border-slate-300 shadow"
              />

              {imageError && (
                <p className="text-xs text-red-500 mt-1">
                  Could not load image. Check the URL or try a different host.
                </p>
              )}
            </div>
          )}
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
              <option key={a.id} value={a.id}>
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
              <option key={p.id} value={p.id}>
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
