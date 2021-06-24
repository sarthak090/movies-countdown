export const getOverView = (overView) => {
  return overView.replace(/^(.{100}[^\s]*).*/, "$1");

  //100 charc of overwiew without cutting any words
};
