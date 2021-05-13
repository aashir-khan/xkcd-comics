import { unionize, UnionOf, ofType } from 'unionize';

// represents all the failures that can occur in the comicStrips module
// ideally would have separate failures for both "reads" and "writes"
export const ComicStripFailureCases = unionize({
  notFound: ofType<Record<string, never>>(),
  serverError: ofType<Record<string, never>>(),
  unexpected: ofType<Record<string, never> | { message?: string }>(),
});

// required to export to be able to for example use in function parameter return value type definition
export type ComicStripFailure = UnionOf<typeof ComicStripFailureCases>;
