import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { DocumentResult } from '../interface/document';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

function uniq(a: string[]) {
  const seen: {
    [item: string]: boolean;
  } = {};
  return a.filter(function (item) {
    return Object.prototype.hasOwnProperty.call(seen, item)
      ? false
      : (seen[item] = true);
  });
}

function matchSearchTerm(regex: RegExp, text: string) {
  const result: string[] = [];
  let m;

  while ((m = regex.exec(text)) !== null) {
    // This is necessary to avoid infinite loops with zero-width matches
    if (m.index === regex.lastIndex) {
      regex.lastIndex++;
    }

    // The result can be accessed through the `m`-variable.
    m.forEach((match) => {
      result.push(match.trim());
    });
  }

  return result;
}

export function findSuggestions(
  searchTerm: string,
  doc: DocumentResult,
  limit = 5
) {
  const regex = RegExp(`\\s\\S+\\s${searchTerm}(?:\\S+)?\\s?(?:\\S+)?`, 'gmi');
  let suggestions: string[] = [];

  doc.ResultItems.forEach((item) => {
    const title = item.DocumentTitle.Text;
    suggestions = [...suggestions, ...matchSearchTerm(regex, title)];

    const excerpt = item.DocumentExcerpt.Text;
    suggestions = [...suggestions, ...matchSearchTerm(regex, excerpt)];
  });

  suggestions = uniq(suggestions);

  if (limit && limit > 0) {
    suggestions = suggestions.slice(0, limit);
  }

  return suggestions;
}
