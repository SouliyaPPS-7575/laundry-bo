
export const userProfileKey = {
  all: ['userProfileKey'] as const,
  lists: () => [userProfileKey.all, 'lists'] as const,
};
