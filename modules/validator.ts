/**
 * Object that stores a function to validate length of given character and given array.
 */
const tools = {
  /**
   * Text length validation
   * @param text text/string
   * @param min the minimum length of the text
   * @param max the maximum length of the text
   * @returns return a boolean value whether true/false
   */
  validLength(text, min, max) {
    return text.length >= min && text.length <= max;
  },

  /**
   * Array length validation
   * @param arr array
   * @param min the minimum length of the array
   * @param max the maximum array of the length
   * @returns boolean value, true/false
   */
  validLengthArray(arr, min, max) {
    return arr.length >= min && arr.length <= max;
  },
};

/**
 * Object containing default message when the validation failed
 */
const msg = {
  title: "Panjang judul 10 - 100 karakter",
  background: "Panjang latar belakang 50 - 400 karakter",
  tags: "Tag minimal 1 dan maksimal 4",
  content: "Isi ide minimal 100 - 10000 karakter",
};

/**
 * The validator object that contained each individuals function represent the corresponding items
 */
const validator = {
  /**
   * Method to validate idea's title
   * @param title string of the title
   * @returns true if between 10 to 100 characters
   */
  title(title) {
    if (!tools.validLength(title, 10, 100)) return false;

    return true;
  },

  /**
   * Method to validate idea's background
   * @param background string of the background
   * @returns return false if the string more than 400 or less than 50
   */
  background(background) {
    if (!tools.validLength(background, 50, 400)) return false;

    return true;
  },

  /**
   * Method to validate length of the array of tags with minimum 1 tag and maximum 4 tags
   * @param tags the array of the tags
   * @returns true/false
   */
  tags(tags) {
    if (!tools.validLengthArray(tags, 1, 4)) return false;
    return true;
  },

  /**
   * Method to validate content length
   * @param content text/string content
   * @returns true if content character more than 100 and less than 1000
   */
  content(content) {
    if (!tools.validLength(content, 100, 10000)) return false;
    return true;
  },
};

/** Export the validator object and msg object */
export { validator, msg };
