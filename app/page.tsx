"use client";

import { useState, KeyboardEvent } from "react";

type FilterType = "all" | "active" | "completed";

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [input, setInput] = useState("");
  const [filter, setFilter] = useState<FilterType>("all");

  const addTodo = () => {
    const trimmed = input.trim();
    if (!trimmed) return;
    setTodos((prev) => [
      ...prev,
      { id: Date.now(), text: trimmed, completed: false },
    ]);
    setInput("");
  };

  const toggleTodo = (id: number) => {
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  const deleteTodo = (id: number) => {
    setTodos((prev) => prev.filter((t) => t.id !== id));
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") addTodo();
  };

  const filtered = todos.filter((t) => {
    if (filter === "active") return !t.completed;
    if (filter === "completed") return t.completed;
    return true;
  });

  const activeCount = todos.filter((t) => !t.completed).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-sky-100 dark:from-zinc-900 dark:to-zinc-800 flex items-start justify-center pt-16 px-4">
      <main className="w-full max-w-lg">
        <h1 className="text-3xl font-bold text-center text-indigo-700 dark:text-indigo-300 mb-8">
          TODO リスト
        </h1>

        {/* 入力エリア */}
        <div className="flex gap-2 mb-6">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="新しいタスクを入力..."
            className="flex-1 rounded-lg border border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-800 px-4 py-2 text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
          <button
            onClick={addTodo}
            className="rounded-lg bg-indigo-600 px-5 py-2 text-white font-semibold hover:bg-indigo-700 active:bg-indigo-800 transition-colors"
          >
            追加
          </button>
        </div>

        {/* フィルター */}
        <div className="flex gap-2 mb-4">
          {(["all", "active", "completed"] as FilterType[]).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`flex-1 rounded-lg py-1.5 text-sm font-medium transition-colors ${
                filter === f
                  ? "bg-indigo-600 text-white"
                  : "bg-white dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 hover:bg-indigo-50 dark:hover:bg-zinc-700 border border-zinc-200 dark:border-zinc-600"
              }`}
            >
              {f === "all" ? "すべて" : f === "active" ? "未完了" : "完了済み"}
            </button>
          ))}
        </div>

        {/* タスク一覧 */}
        <ul className="space-y-2">
          {filtered.length === 0 && (
            <li className="text-center text-zinc-400 dark:text-zinc-500 py-10 text-sm">
              タスクがありません
            </li>
          )}
          {filtered.map((todo) => (
            <li
              key={todo.id}
              className="flex items-center gap-3 rounded-lg bg-white dark:bg-zinc-800 border border-zinc-100 dark:border-zinc-700 px-4 py-3 shadow-sm"
            >
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleTodo(todo.id)}
                className="h-4 w-4 accent-indigo-600 cursor-pointer"
              />
              <span
                className={`flex-1 text-sm ${
                  todo.completed
                    ? "line-through text-zinc-400 dark:text-zinc-500"
                    : "text-zinc-800 dark:text-zinc-100"
                }`}
              >
                {todo.text}
              </span>
              <button
                onClick={() => deleteTodo(todo.id)}
                aria-label="削除"
                className="text-zinc-300 hover:text-red-500 dark:text-zinc-600 dark:hover:text-red-400 transition-colors text-lg leading-none"
              >
                ✕
              </button>
            </li>
          ))}
        </ul>

        {/* フッター */}
        {todos.length > 0 && (
          <p className="mt-4 text-right text-xs text-zinc-400 dark:text-zinc-500">
            残り {activeCount} 件
          </p>
        )}
      </main>
    </div>
  );
}
