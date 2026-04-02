export const normalizeAdsResponse = (payload) => {
  if (Array.isArray(payload)) {
    return { items: payload, hasMore: payload.length > 0 };
  }

  return {
    items: payload?.items || [],
    hasMore: Boolean(payload?.hasMore ?? payload?.nextPage),
  };
};
