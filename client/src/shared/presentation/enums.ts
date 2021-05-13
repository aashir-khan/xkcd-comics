export const presentationEnums = {
  routeNames: {
    home: '/',
  },
  errorMessages: {
    server: 'Server error occurred',
    unexpected: 'Unexpected error occurred',
    notFound: (pretext: string) => `${pretext} was not found`,
  },
};
