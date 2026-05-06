import React from "react";
import {
  PieChart,
  Pie,
  Tooltip,
  Cell,
  ResponsiveContainer,
} from "recharts";

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff7f50", "#a4de6c"];

export default function ChartView({ characters, onBack }) {
  if (!characters || characters.length === 0) {
    return (
      <section className="rounded border bg-white p-6 shadow-sm">
        <h2 className="text-2xl font-semibold mb-4">Character Stats</h2>
        <p className="text-slate-600">No characters available.</p>
        <button
          onClick={onBack}
          className="mt-6 px-4 py-2 bg-slate-600 text-white rounded"
        >
          Back
        </button>
      </section>
    );
  }

  const counts = {};
  characters.forEach((char) => {
    const key =
      typeof char.personality === "string"
        ? char.personality
        : char.personality?.name;

    counts[key] = (counts[key] || 0) + 1;
  });

  const data = Object.entries(counts).map(([name, value]) => ({
    name,
    value,
  }));

  return (
    <section className="rounded border bg-white p-6 shadow-sm">
      <h2 className="text-2xl font-semibold mb-4">Character Stats</h2>

      <div style={{ width: "100%", height: 400 }}>
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              label={({ name }) => name}
              outerRadius={160}
              innerRadius={100}
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <button
        onClick={onBack}
        className="mt-6 px-4 py-2 bg-slate-600 text-white rounded"
      >
        Back
      </button>
    </section>
  );
}
