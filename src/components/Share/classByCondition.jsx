export function classByCondition(className, condition) {
    if (condition) {
      return " " + className;
    }
    return "";
  }