/**
 * Theme utilities to ensure consistent theme application across the application
 */

/**
 * Ensures the HTML document class contains the correct theme class
 * @param theme 'light' | 'dark'
 */
export const applyThemeToDocument = (theme: 'light' | 'dark'): void => {
  if (typeof document !== 'undefined') {
    // Remove both classes first
    document.documentElement.classList.remove('light', 'dark');
    // Add the correct theme class
    document.documentElement.classList.add(theme);
    // Ensure transition classes are applied
    document.documentElement.classList.add('transition-colors', 'duration-300');
    // Store the theme in localStorage
    localStorage.setItem('theme', theme);
  }
};

/**
 * Gets the current theme from localStorage or system preference
 * @returns 'light' | 'dark'
 */
export const getStoredTheme = (): 'light' | 'dark' => {
  if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme === 'light' || storedTheme === 'dark') {
      return storedTheme;
    }
    
    // Check system preference
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
  }
  
  // Default to light theme
  return 'light';
};

/**
 * Adds a pulsing animation to the body element for theme change visual feedback
 */
export const pulseTheme = (): void => {
  if (typeof document !== 'undefined') {
    document.documentElement.classList.add('theme-transitioning');
    
    setTimeout(() => {
      document.documentElement.classList.remove('theme-transitioning');
    }, 500);
  }
}; 