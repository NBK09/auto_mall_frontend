const resolveBrandName = (ad) => ad.brand || ad.brandName || ad.brand?.name || ad.vehicle?.brand?.name || ad.vehicleBrand || '';
const resolveModelName = (ad) => ad.model || ad.modelName || ad.model?.name || ad.vehicle?.model?.name || ad.vehicleModel || '';

const resolvePhotos = (ad) => {
  if (Array.isArray(ad.photoUrls)) return ad.photoUrls;
  if (Array.isArray(ad.photos)) return ad.photos;
  if (Array.isArray(ad.images)) return ad.images;

  if (ad.photoUrl || ad.imageUrl) {
    return [ad.photoUrl || ad.imageUrl];
  }

  return [];
};

export const mapAdEntity = (ad = {}) => {
  const photos = resolvePhotos(ad)
    .map((photo) => (typeof photo === 'string' ? photo : photo?.url || photo?.path || ''))
    .filter(Boolean);

  const brandName = resolveBrandName(ad);
  const modelName = resolveModelName(ad);

  return {
    ...ad,
    title: ad.title || [brandName, modelName, ad.year].filter(Boolean).join(' '),
    brandName,
    modelName,
    city: ad.city || ad.cityName || '',
    photos,
    isFavorite: Boolean(ad.isFavorite ?? ad.favorite),
  };
};

export const getAdPrimaryPhoto = (ad = {}) => mapAdEntity(ad).photos[0] || '';

export const normalizeAdsResponse = (payload) => {
  if (Array.isArray(payload)) {
    const items = payload.map(mapAdEntity);
    return { items, hasMore: payload.length > 0 };
  }

  const items = (payload?.items || payload?.content || []).map(mapAdEntity);

  return {
    items,
    hasMore: Boolean(payload?.hasMore ?? payload?.nextPage ?? payload?.hasNext),
  };
};
