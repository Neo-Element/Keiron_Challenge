export const selectStateToMap = (
  useContextState: Pokemon[],
  reactLocalState: Pokemon[]
) => {
  if (useContextState.length) return useContextState;
  return reactLocalState;
};
