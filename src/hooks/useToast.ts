export const useToast = () => {
  const comingsoonToast = () => {
    // 简单的提示实现，可以后续替换为更完善的 toast 库
    alert("Coming soon!");
  };

  return {
    comingsoonToast
  };
};

