export const dateFormat = (date) => {
  const newDate = new Date(date.split("T")[0].split("-"));

  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  return newDate.toLocaleDateString("es-ES", options);
};

export const shortDateAndHour = (date) => {
  const newDate = new Date(date);

  const options = {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  };

  return newDate.toLocaleDateString("es-ES", options);
};
