import { DocumentResult } from "./document";
import { Suggestion } from "./suggestion";

export interface ResultItem {
  doc: DocumentResult;
  suggestion: Suggestion
}
