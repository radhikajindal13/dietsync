import { useState } from 'react';
import { LandingPage } from './components/LandingPage';
import { OnboardingPage } from './components/OnboardingPage';
import { HomePage } from './components/HomePage';
import { DashboardPage } from './components/DashboardPage';
import { MealDetailPage } from './components/MealDetailPage';
import { WeeklyPlannerPage } from './components/WeeklyPlannerPage';
import { GroceryListPage } from './components/GroceryListPage';
import { Sidebar } from './components/Sidebar';
import { FeedbackModel } from './components/FeedbackModel';

import type { Page } from './types/navigation';
import type { UserProfile } from './types/user';
import type { Meal } from './types/meal';

export default function App() {
  /* ---------------- Navigation ---------------- */
  const [pageStack, setPageStack] = useState<Page[]>(['landing']);
  const currentPage = pageStack[pageStack.length - 1];

  /* ---------------- State ---------------- */
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [selectedMeal, setSelectedMeal] = useState<Meal | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);

  /* ---------------- Theme ---------------- */
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const toggleTheme = () =>
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));

  /* ---------------- Navigation helpers ---------------- */
  const goTo = (page: Page) => {
    setPageStack(prev =>
      prev[prev.length - 1] === page ? prev : [...prev, page]
    );
  };

  const goBack = () => {
    setPageStack(prev => (prev.length > 1 ? prev.slice(0, -1) : prev));
  };

  /* ---------------- Onboarding ---------------- */
  const handleOnboardingComplete = (profile: UserProfile) => {
    setUserProfile(profile);
    setPageStack(['home']); // ⬅️ LAND ON HOME
  };

  /* ---------------- HomePage navigation mapping ---------------- */
  const homePageNavigate = (page: 'mealFeed' | 'weeklyPlanner' | 'groceryList' | 'feedback') => {
    if (page === 'feedback') {
      setShowFeedback(true);
      return;
    }

    const pageMap: Record<string, Page> = {
      mealFeed: 'dashboard',
      weeklyPlanner: 'planner',
      groceryList: 'grocery',
    };

    goTo(pageMap[page]);
  };

  return (
    <div className={theme === 'dark' ? 'dark' : ''}>
      <div className="flex h-screen bg-gray-50 dark:bg-gray-900">

        {/* ---------------- Sidebar ---------------- */}
        {userProfile && !['landing', 'onboarding'].includes(currentPage) && (
          <Sidebar
            currentPage={currentPage}
            onNavigate={(page) => {
              if (page === 'feedback') {
                setShowFeedback(true);
              } else {
                goTo(page);
              }
            }}
            theme={theme}
            toggleTheme={toggleTheme}
            user={{ name: userProfile.name, email: 'user@email.com' }}
          />
        )}

        {/* ---------------- Main (scrolls only here) ---------------- */}
        <main className="flex-1 h-screen overflow-y-auto">

          {currentPage === 'landing' && (
            <LandingPage onGetStarted={() => goTo('onboarding')} />
          )}

          {currentPage === 'onboarding' && (
            <OnboardingPage
              onComplete={handleOnboardingComplete}
              onBack={goBack}
            />
          )}

          {currentPage === 'home' && userProfile && (
            <HomePage
              userName={userProfile.name}
              dietPreference={userProfile.dietPreference}
              medicalConditions={userProfile.medicalConditions}
              budget={userProfile.budget}
              onNavigate={homePageNavigate}
            />
          )}

          {(currentPage === 'dashboard' || currentPage === 'feed') && userProfile && (
            <DashboardPage
              userProfile={userProfile}
              onMealClick={(meal) => {
                setSelectedMeal(meal);
                goTo('meal-detail');
              }}
              onOpenFeedback={() => setShowFeedback(true)}
            />
          )}

          {currentPage === 'meal-detail' && selectedMeal && (
            <MealDetailPage
              meal={selectedMeal}
              onBack={goBack}
              onNavigate={goTo}
            />
          )}

          {currentPage === 'planner' && userProfile && (
            <WeeklyPlannerPage
              userProfile={userProfile}
              onNavigate={goTo}
            />
          )}

          {currentPage === 'grocery' && userProfile && (
            <GroceryListPage
              userProfile={userProfile}
              onNavigate={goTo}
            />
          )}
        </main>
      </div>

      {/* ---------------- Feedback Modal ---------------- */}
      {showFeedback && (
        <FeedbackModel
          open={showFeedback}
          onClose={() => setShowFeedback(false)}
        />
      )}
    </div>
  );
}
