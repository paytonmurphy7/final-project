import React, { useEffect, useState } from "react";
import CharacterList from "./CharacterList.jsx";
import CharacterForm from "./CharacterForm.jsx";
import ChartView from "./ChartView.jsx";
import { getCharacters, getAnime, getPersonalities } from "../api.js";
import { getToken } from "../tokenStorage";


export default function Homepage({ username }) {
  const [characters, setCharacters] = useState([]);
  const [animeList, setAnimeList] = useState([]);
  const [personalities, setPersonalities] = useState([]);
  const [mode, setMode] = useState("list");
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const token = getToken();

  const [search, setSearch] = useState("");
  const [animeFilter, setAnimeFilter] = useState("");
  const [personalityFilter, setPersonalityFilter] = useState("");
  const [sortBy, setSortBy] = useState("name");

  async function loadData() {
    const chars = await getCharacters();
    const anime = await getAnime();
    const pers = await getPersonalities();

    setCharacters(chars);
    setAnimeList(anime);
    setPersonalities(pers);
  }

  useEffect(() => {
    loadData();
  }, []);

  function handleCreate() {
    setSelectedCharacter(null);
    setMode("create");
  }

  function handleEdit(char) {
    setSelectedCharacter(char);
    setMode("edit");
  }

  function handleSave() {
    loadData();
    setMode("list");
  }

  function handleDelete() {
    loadData();
  }

  const filteredCharacters = characters
    .filter((c) =>
      c.name.toLowerCase().includes(search.toLowerCase())
    )
    .filter((c) =>
      animeFilter ? c.anime.title === animeFilter : true
    )
    .filter((c) =>
      personalityFilter
        ? (typeof c.personality === "string"
            ? c.personality
            : c.personality.name) === personalityFilter
        : true
    )
    .sort((a, b) => {
      if (sortBy === "name") {
        return a.name.localeCompare(b.name);
      }
      if (sortBy === "age") {
        return (a.age || 0) - (b.age || 0);
      }
      if (sortBy === "anime") {
        return a.anime.title.localeCompare(b.anime.title);
      }
      return 0;
    });

  return (
    <main
      className="mx-auto max-w-7xl px-6 py-8 min-h-screen bg-slate-50 
      bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2240%22 height=%2240%22 fill=%22%23dbeafe%22 opacity=%220.4%22><circle cx=%222%22 cy=%222%22 r=%221%22/></svg>')]"
    >

      <div
        className="w-full py-5 px-6 rounded-xl mb-8 shadow-md"
        style={{
          background: "linear-gradient(135deg, #3B82F6 0%, #60A5FA 100%)",
        }}
      >
        <nav className="flex gap-6 mb-6 text-slate-100 font-medium">
          <button
            onClick={() => setMode("list")}
            className={
              "pb-2 border-b-2 transition " +
              (mode === "list"
                ? "border-white text-white"
                : "border-transparent hover:text-blue-100")
            }
          >
            Characters
          </button>

          <button
            onClick={() => setMode("stats")}
            className={
              "pb-2 border-b-2 transition " +
              (mode === "stats"
                ? "border-white text-white"
                : "border-transparent hover:text-blue-100")
            }
          >
            Stats
          </button>

          <button
            onClick={() => setMode("about")}
            className={
              "pb-2 border-b-2 transition " +
              (mode === "about"
                ? "border-white text-white"
                : "border-transparent hover:text-blue-100")
            }
          >
            About
          </button>
        </nav>

        <h1 className="text-3xl font-bold text-white flex items-center gap-2">
          Ani-Index
          <svg
            className="w-6 h-6 sparkle-animate"
            viewBox="0 0 24 24"
            fill="#FDE68A"
          >
            <path d="M12 2l2 6 6 2-6 2-2 6-2-6-6-2 6-2z" />
          </svg>
        </h1>

        {username && (
          <p className="text-blue-100 mt-1">Logged in as {username}</p>
        )}
      </div>

      <div className="flex gap-8">

        <aside className="w-64 bg-white rounded-xl shadow p-5 border border-slate-200">

          <h2 className="text-lg font-semibold text-slate-700 mb-4 flex items-center gap-2">
            Filters <span className="text-blue-400">✧</span>
          </h2>

          <div className="mb-5">
            <label className="block text-sm font-medium text-slate-600 mb-1">
              Search
            </label>
            <input
              type="text"
              placeholder="Search characters..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-slate-300 shadow-sm focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div className="mb-5">
            <label className="block text-sm font-medium text-slate-600 mb-1">
              Anime
            </label>
            <select
              className="w-full px-3 py-2 rounded-lg border border-slate-300 bg-white shadow-sm focus:ring-2 focus:ring-blue-400"
              value={animeFilter}
              onChange={(e) => setAnimeFilter(e.target.value)}
            >
              <option value="">All Anime</option>
              {animeList.map((a) => (
                <option key={a.id} value={a.title}>
                  {a.title}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-5">
            <label className="block text-sm font-medium text-slate-600 mb-1">
              Personality
            </label>
            <select
              className="w-full px-3 py-2 rounded-lg border border-slate-300 bg-white shadow-sm focus:ring-2 focus:ring-blue-400"
              value={personalityFilter}
              onChange={(e) => setPersonalityFilter(e.target.value)}
            >
              <option value="">All Personalities</option>
              {personalities.map((p) => (
                <option key={p.id} value={p.name}>
                  {p.name}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-slate-600 mb-1">
              Sort By
            </label>
            <select
              className="w-full px-3 py-2 rounded-lg border border-slate-300 bg-white shadow-sm focus:ring-2 focus:ring-blue-400"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="name">Name (A–Z)</option>
              <option value="age">Age</option>
              <option value="anime">Anime</option>
            </select>
          </div>

{token ? (
  <button
    onClick={handleCreate}
    className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700"
  >
    Add Character
  </button>
) : (
  <p className="text-sm text-slate-500 mt-2">
    Log in to add characters.
  </p>
)}

        </aside>

        <section className="flex-1">

          {mode === "list" && (
            <CharacterList
              characters={filteredCharacters}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          )}

          {mode === "create" && (
            <CharacterForm
              animeList={animeList}
              personalities={personalities}
              onSave={handleSave}
              onCancel={() => setMode("list")}
            />
          )}

          {mode === "edit" && (
            <CharacterForm
              initialItem={selectedCharacter}
              animeList={animeList}
              personalities={personalities}
              onSave={handleSave}
              onCancel={() => setMode("list")}
            />
          )}

          {mode === "stats" && (
            <ChartView
              characters={characters}
              onBack={() => setMode("list")}
            />
          )}

          {mode === "about" && (
            <div className="bg-white rounded-xl shadow p-6 border border-slate-200">
              <h2 className="text-2xl font-bold text-slate-800 mb-3">
                About Ani‑Index ✨
              </h2>
              <p className="text-slate-600 leading-relaxed">
                Ani‑Index is a great tool to help you search and organize all your favorite Anime Characters! 
              </p>
            </div>
          )}

        </section>
      </div>
    </main>
  );
}
