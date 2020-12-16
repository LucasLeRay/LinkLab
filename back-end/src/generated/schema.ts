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
  tag?: Maybe<Scalars['String']>;
  userId?: Maybe<Scalars['String']>;
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
  title: Scalars['String'];
  img?: Maybe<Scalars['String']>;
  url: Scalars['String'];
  tags: Array<Maybe<Scalars['String']>>;
};

export type Category = {
  __typename?: 'Category';
  id: Scalars['ID'];
  name: Scalars['String'];
  icon?: Maybe<Scalars['String']>;
};

export type CreateLinkInput = {
  url: Scalars['String'];
  tags: Array<Maybe<Scalars['String']>>;
};

export type UpdateLinkInput = {
  id: Scalars['ID'];
  tags: Array<Maybe<Scalars['String']>>;
};

export type DeleteLinkInput = {
  id: Scalars['ID'];
};

export type UpdateCategoryIconInput = {
  name: Scalars['String'];
  icon: Scalars['String'];
};
