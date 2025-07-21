export const checkWordValid = async (word) => {
  try {
    const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word.toLowerCase()}`);
    if (!response.ok) {
      // Word not found (404)
      return false;
    }
    const data = await response.json();
    return Array.isArray(data); // valid if data is an array of definitions
  } catch (error) {
    console.error('Error checking word:', error);
    return false;
  }
};