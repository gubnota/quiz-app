// import categoriesData from "../data/categories.json";

// export const CATEGORIES = categoriesData.categories;

// Helper function to flatten categories for dropdown
const flattenCategories = (categories, level = 0) => {
  return categories
    .map((category) => {
      const indent = "→".repeat(level);
      const flatCategory = {
        key: category.key,
        text: `${indent}${category.text}`,
        value: category.value,
        includeValues: [category.value],
      };

      if (category.subcategories) {
        const flattenedSubcategories = flattenCategories(
          category.subcategories,
          level + 1
        );
        flatCategory.includeValues = [
          category.value,
          ...flattenedSubcategories.flatMap((sub) => sub.includeValues),
        ];
        return [flatCategory, ...flattenedSubcategories];
      }

      return [flatCategory];
    })
    .flat();
};

export const loadCategories = async () => {
  try {
    const response = await fetch(
      `${import.meta.env.BASE_URL}data/categories.json`
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    const categories = data.categories;
    return {
      categories,
      flattenedCategories: flattenCategories(categories),
    };
  } catch (error) {
    console.error("Error loading categories:", error);
    return {
      categories: [],
      flattenedCategories: [],
    };
  }
};

// export default CATEGORIES;
