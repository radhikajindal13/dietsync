import { useState, useEffect } from "react";
import {
  ArrowLeft,
  Clock,
  Users,
  ChefHat,
  RefreshCw,
  Calendar,
  ShoppingCart,
  Info,
  CheckCircle,
  Heart,
  ThumbsUp,
  ThumbsDown,
  Zap,
  Beef,
  Wheat,
  Droplets,
} from "lucide-react";
import type { Meal } from "../types/meal";
import api from "../api/axios";
import type { UserProfile } from "../types/user";

type MealFeedPageProps = {
  userProfile: UserProfile;
  onNavigate: (page: "planner" | "grocery") => void;
};

export function MealFeedPage({ userProfile, onNavigate }: MealFeedPageProps) {
  const [meals, setMeals] = useState<Meal[]>([]);
  const [selectedMeal, setSelectedMeal] = useState<Meal | null>(null);
  const [loading, setLoading] = useState(true);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    api
      .get("/api/meals")
      .then((res) => setMeals(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-slate-950">
        <RefreshCw className="animate-spin w-8 h-8 text-emerald-500" />
      </div>
    );
  }

  /* ========================= GRID VIEW ========================= */
  if (!selectedMeal) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-slate-950 p-8 transition-colors duration-500">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {meals.map((meal) => (
            <div
              key={meal._id}
              onClick={() => setSelectedMeal(meal)}
              className="bg-white dark:bg-slate-900 rounded-3xl overflow-hidden border border-gray-100 dark:border-slate-800 hover:shadow-xl transition cursor-pointer"
            >
              <img
                src={meal.image}
                className="h-56 w-full object-cover"
                alt={meal.name}
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100">{meal.name}</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                  {meal.calories} kcal • High Protein
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  /* ========================= DETAIL VIEW ========================= */
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950 pb-20 transition-colors duration-500 font-sans">
      {/* Header */}
      <header className="sticky top-0 bg-white/80 dark:bg-slate-900/80 backdrop-blur border-b border-gray-100 dark:border-slate-800 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <button
            onClick={() => setSelectedMeal(null)}
            className="flex items-center gap-2 text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
          >
            <ArrowLeft size={18} /> Back to Discovery
          </button>
          <span className="text-xs bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 px-3 py-1 rounded-full font-bold">
            AI Confidence: 92%
          </span>
        </div>
      </header>

      {/* HERO SPLIT */}
      <section className="max-w-7xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-stretch">
          {/* LEFT IMAGE */}
          <div className="relative rounded-3xl overflow-hidden shadow-lg border border-transparent dark:border-slate-800">
            <img
              src={selectedMeal.image}
              alt={selectedMeal.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* RIGHT ACTION PANEL */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-gray-100 dark:border-slate-800 flex flex-col justify-between shadow-sm">
            <div className="space-y-6">
              <h1 className="text-4xl font-bold text-slate-900 dark:text-slate-100">{selectedMeal.name}</h1>

              <div className="flex flex-wrap gap-3">
                <Tag icon={Clock} text="30 mins" />
                <Tag icon={ChefHat} text="Easy Prep" />
                <Tag icon={Users} text="2 servings" />
              </div>

              {/* WHY ML */}
              <div className="bg-emerald-50 dark:bg-emerald-950/20 p-5 rounded-2xl border border-emerald-100/50 dark:border-emerald-900/20">
                <p className="text-xs font-bold uppercase text-emerald-600 dark:text-emerald-400 mb-3 tracking-widest">
                  Recommended because
                </p>
                <ul className="text-sm space-y-2 text-slate-700 dark:text-slate-300 font-medium">
                  <li className="flex items-center gap-2">✔ Matches {userProfile.dietPreference.join(", ")}</li>
                  <li className="flex items-center gap-2">✔ Low sodium (BP friendly)</li>
                  <li className="flex items-center gap-2">✔ High protein balance</li>
                </ul>
              </div>

              {/* NUTRITION */}
              <div className="grid grid-cols-2 gap-4">
                <Nutrient icon={Zap} label="Calories" value={`${selectedMeal.calories} kcal`} />
                <Nutrient icon={Beef} label="Protein" value={`${selectedMeal.protein} g`} />
                <Nutrient icon={Wheat} label="Carbs" value={`${selectedMeal.carbs} g`} />
                <Nutrient icon={Droplets} label="Fat" value={`${selectedMeal.fat} g`} />
              </div>
            </div>

            {/* ACTIONS */}
            <div className="mt-10 flex gap-4">
              <button
                onClick={() => setIsSaved(!isSaved)}
                className={`p-4 rounded-2xl border transition-all duration-300 ${
                  isSaved
                    ? "bg-rose-50 dark:bg-rose-950/30 text-rose-500 border-rose-200 dark:border-rose-900/50"
                    : "bg-gray-50 dark:bg-slate-800 text-gray-500 dark:text-slate-400 border-transparent"
                }`}
              >
                <Heart fill={isSaved ? "currentColor" : "none"} className="w-6 h-6" />
              </button>

              <button
                onClick={() => onNavigate("planner")}
                className="flex-1 bg-emerald-600 hover:bg-emerald-500 dark:bg-emerald-600 dark:hover:bg-emerald-500 text-white rounded-2xl font-bold shadow-lg shadow-emerald-600/20 transition-all active:scale-95"
              >
                Plan this meal
              </button>

              <button
                onClick={() => onNavigate("grocery")}
                className="p-4 bg-gray-50 dark:bg-slate-800 rounded-2xl text-gray-600 dark:text-slate-300 border border-transparent dark:hover:border-slate-700 transition-all"
              >
                <ShoppingCart className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* FEEDBACK */}
      <section className="max-w-4xl mx-auto px-6 mt-10 text-center">
        <p className="text-xs uppercase font-bold text-slate-400 dark:text-slate-500 mb-6 tracking-widest">
          Improve Recommendations
        </p>
        <div className="flex justify-center gap-8">
          <button className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 text-slate-400 dark:text-slate-500 hover:text-emerald-500 dark:hover:text-emerald-400 transition-all shadow-sm">
            <ThumbsUp />
          </button>
          <button className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 text-slate-400 dark:text-slate-500 hover:text-rose-500 dark:hover:text-rose-400 transition-all shadow-sm">
            <ThumbsDown />
          </button>
        </div>
      </section>
    </div>
  );
}

/* ========================= HELPERS ========================= */

function Tag({ icon: Icon, text }: any) {
  return (
    <span className="flex items-center gap-2 bg-gray-100 dark:bg-slate-800 px-4 py-2 rounded-full text-sm font-semibold text-slate-700 dark:text-slate-300">
      <Icon size={16} className="text-emerald-500" /> {text}
    </span>
  );
}

function Nutrient({ icon: Icon, label, value }: any) {
  return (
    <div className="flex items-center gap-3 bg-gray-50 dark:bg-slate-800/50 p-4 rounded-2xl border border-transparent dark:border-slate-800/50 transition-colors">
      <div className="p-2 bg-emerald-50 dark:bg-emerald-950/30 rounded-lg">
        <Icon size={18} className="text-emerald-500" />
      </div>
      <div>
        <p className="text-[10px] uppercase font-bold text-slate-400 dark:text-slate-500 tracking-tight">{label}</p>
        <p className="font-bold text-slate-900 dark:text-slate-100 tracking-tight">{value}</p>
      </div>
    </div>
  );
}