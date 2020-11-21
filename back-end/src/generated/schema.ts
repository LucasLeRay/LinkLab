export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Query = {
  __typename?: 'Query';
  links?: Maybe<Array<Maybe<Link>>>;
  categories?: Maybe<Array<Maybe<Category>>>;
};


export type QueryLinksArgs = {
  category: Scalars['ID'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createLink?: Maybe<Link>;
  updateLink?: Maybe<Link>;
  deleteLink?: Maybe<Link>;
  updateCategoryIcon?: Maybe<Category>;
};


export type MutationCreateLinkArgs = {
  input: CreateLinkInput;
};


export type MutationUpdateLinkArgs = {
  input: UpdateLinkInput;
};


export type MutationDeleteLinkArgs = {
  input: DeleteLinkInput;
};


export type MutationUpdateCategoryIconArgs = {
  input: UpdateCategoryIconInput;
};

export type Link = {
  __typename?: 'Link';
  id: Scalars['ID'];
  url: Scalars['String'];
};

export type Category = {
  __typename?: 'Category';
  id: Scalars['ID'];
  name: Scalars['String'];
  icon?: Maybe<Scalars['String']>;
  links: Array<Maybe<Link>>;
};

export type CreateLinkInput = {
  url: Scalars['String'];
};

export type UpdateLinkInput = {
  id: Scalars['ID'];
  categories?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type DeleteLinkInput = {
  id: Scalars['ID'];
};

export type UpdateCategoryIconInput = {
  category: Scalars['ID'];
  icon?: Maybe<Scalars['String']>;
};
