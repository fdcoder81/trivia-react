const getQuestions = async (category, difficulty) => {
  console.log(category);
  const base = "https://opentdb.com/api.php?amount=10";
  let query = "";

  if (category !== 0 || difficulty !== "easy") {
    query = `&category=${category}&difficulty=${difficulty}`;
  }

  console.log(query);
  const response = await fetch(base + query);
  const data = await response.json();
  return data.results;
};

export default getQuestions;
