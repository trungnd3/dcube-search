import { documents } from '../../tests/mock';
import { cn, filterData, findSuggestions } from './util';

describe('util', () => {
  it('merges class names with cn function', () => {
    expect(cn('class-1', 'class-2')).toBe('class-1 class-2');
  });

  it('returns suggestion list', () => {
    const searchTerm = 'testsuggestion';
    documents.ResultItems[0].DocumentTitle.Text = `${documents.ResultItems[0].DocumentTitle} testing ${searchTerm} testing testing ${searchTerm} testing`;
    expect(findSuggestions(searchTerm, documents)).toContain(
      `testing ${searchTerm} testing`
    );
  });

  it('filter data based on search term', () => {
    const searchTerm = 'testsuggestion';
    const resultTitle = `${documents.ResultItems[0].DocumentTitle} testing ${searchTerm} testing testing ${searchTerm} testing`;
    documents.ResultItems[0].DocumentTitle.Text = resultTitle;
    expect(filterData(searchTerm, documents).ResultItems[0].DocumentTitle.Text).toEqual(
      resultTitle
    );
  });
});
