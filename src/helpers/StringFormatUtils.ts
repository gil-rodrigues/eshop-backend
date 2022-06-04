class StringFormatUtils {
  static TrimExtraSpaces(text: string): string {
    return !text ? '' : text.replace(/\s+/g, ' ');
  }
}

export default StringFormatUtils;
