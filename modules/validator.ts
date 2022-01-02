const tools = {
  validLength(text, min, max) {
    return text.length >= min && text.length <= max;
  },
  validLengthArray(arr, min, max) {
    return arr.length >= min && arr.length <= max;
  },
};

const msg = {
  title: "Panjang judul 10 - 100 karakter",
  background: "Panjang latar belakang 50 - 300 karakter",
  tags: "Tag minimal 1 dan maksimal 4",
  content: "Isi ide minimal 100 - 1000 karakter",
};

const validator = {
  title(title) {
    if (!tools.validLength(title, 10, 100)) return false;

    return true;
  },

  background(background) {
    if (!tools.validLength(background, 50, 300)) return;
    false;

    return true;
  },

  tags(tags) {
    if (!tools.validLengthArray(tags, 1, 4)) return false;
    return true;
  },

  content(content) {
    if (!tools.validLength(content, 100, 1000)) return false;
    return true;
  },
};

export { validator, msg };
