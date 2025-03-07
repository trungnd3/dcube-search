
export interface DocumentResult {
  Page: number;
  PageSize: number;
  TotalNumberOfResults: number;
  ResultItems: Array<Document>
}

export interface Document {
  DocumentId: string;
  DocumentURI: string;
  DocumentTitle: TextContent;
  DocumentExcerpt: TextContent;
}

export interface TextContent {
  Text: string;
  Highlights: Array<{
    BeginOffset: number;
    EndOffset: number;
  }>
}
