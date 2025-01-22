import { BASE_URL, joinPaths } from "../config";

/**
 * Loads questions for a given category from JSON files via HTTP
 * @param {Object} selectedCategory - The selected category object from FLATTENED_CATEGORIES
 * @returns {Promise<Array>} Array of questions
 */
export const loadQuestionsForCategory = async (selectedCategory) => {
  if (!selectedCategory) return [];

  try {
    if (selectedCategory.includeValues) {
      // Get leaf categories (categories without subcategories)
      const parentCategories = selectedCategory.includeValues.filter((value) =>
        selectedCategory.includeValues.some(
          (v) => v.startsWith(`${value}/`) || v.startsWith(`${value}.`)
        )
      );

      const categoriesToLoad = selectedCategory.includeValues.filter(
        (value) => !parentCategories.includes(value)
      );

      // Load questions from all included categories
      const allQuestions = await Promise.all(
        categoriesToLoad.map(async (catValue) => {
          try {
            const response = await fetch(
              `${import.meta.env.BASE_URL}data/categories/${catValue}.json`
            );
            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            return data;
          } catch (error) {
            console.warn(`No questions file found for category: ${catValue}`);
            return [];
          }
        })
      );

      // Remove duplicates by comparing question texts
      const uniqueQuestions = allQuestions.flat().reduce((acc, current) => {
        const isDuplicate = acc.some(
          (question) => question.question === current.question
        );
        if (!isDuplicate) {
          acc.push(current);
        }
        return acc;
      }, []);

      return uniqueQuestions;
    } else {
      // Load single category questions
      const response = await fetch(
        `${import.meta.env.BASE_URL}data/categories/${
          selectedCategory.value
        }.json`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    }
  } catch (error) {
    console.error("Error loading questions:", error);
    return [];
  }
};

export async function loadQuestions() {
  try {
    const response = await fetch(
      `${import.meta.env.BASE_URL}data/questions.json`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error loading questions:", error);
    throw error;
  }
}
