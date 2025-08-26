export default function cleanSet(set, startString) {
    if (!startString || startString === '' || typeof startString !== 'string') {
      return '';
    }
    const result = [];
    for (const value of set) {
      if (typeof value === 'string' && value && value.startsWith(startString)) {
        result.push(value.slice(startString.length));
      }
    }
    return result.join('-');
  }