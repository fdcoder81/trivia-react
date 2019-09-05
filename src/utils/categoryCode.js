const getCategoryCode = category => {
  if (category === "Sports") {
    return 21;
  } else if (category === "Geography") {
    return 22;
  } else if (category === "History") {
    return 23;
  } else if (category === "Movies") {
    return 11;
  } else {
    return "";
  }
};

export default getCategoryCode;
