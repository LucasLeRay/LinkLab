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
  tags?: Maybe<Array<Maybe<Tag>>>;
};


export type QueryLinksArgs = {
  tag?: Maybe<Scalars['String']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createLink?: Maybe<Link>;
  updateLink?: Maybe<Link>;
  deleteLink?: Maybe<Link>;
  updateTagIcon?: Maybe<Tag>;
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


export type MutationUpdateTagIconArgs = {
  input: UpdateTagIconInput;
};

export type Link = {
  __typename?: 'Link';
  id: Scalars['ID'];
  title: Scalars['String'];
  img?: Maybe<Scalars['String']>;
  url: Scalars['String'];
  tags: Array<Maybe<Scalars['String']>>;
};

export type Tag = {
  __typename?: 'Tag';
  name: Scalars['String'];
  icon?: Maybe<Scalars['String']>;
  links: Array<Maybe<Link>>;
};

export type CreateLinkInput = {
  url: Scalars['String'];
  tags: Array<Maybe<Scalars['String']>>;
};

export type UpdateLinkInput = {
  id: Scalars['ID'];
  categories?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type DeleteLinkInput = {
  id: Scalars['ID'];
};

export type UpdateTagIconInput = {
  category: Scalars['String'];
  icon?: Maybe<Scalars['String']>;
};
