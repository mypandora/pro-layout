// https://blog.walterlv.com/post/get-gray-reversed-color.html
// https://www.cnblogs.com/carekee/articles/3629964.html
export const getGrayReversedColor = (color) => {
  const R = parseInt(color.slice(1, 3), 16);
  const G = parseInt(color.slice(3, 5), 16);
  const B = parseInt(color.slice(5, 7), 16);

  const gray = (0.299 * R + 0.587 * G + 0.114 * B) / 255;
  return gray > 0.5 ? '#000000' : '#ffffff';
};

export const isExternal = (path) => {
  return /^(https?:|mailto:|tel:)/.test(path);
};
