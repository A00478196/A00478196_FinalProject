export const returnTimeOut = (setSuccess, setError) => {
  setTimeout(() => {
    setSuccess("");
    setError("");
  }, [5000]);
};

export const regexForLabels = (name) => {
    if(name){
      return name
        // return name?.replace(/([a-z])([A-Z])/g, '$1 $2')
    }
}
export const scrollToElement = (id) => {
  // console.log(id)
  let element = document.getElementById(`${id}`);
  // console.log(element)
  return (
    element &&
    element.scrollIntoView({
      behavior: "smooth",
      block: "center",
      inline: "start",
    })
  );
};
