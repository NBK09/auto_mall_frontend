const resolveBrandName = (ad) => ad.brandName || ad.brand?.name || ad.vehicle?.brand?.name || ad.vehicleBrand || '';
const resolveModelName = (ad) => ad.modelName || ad.model?.name || ad.vehicle?.model?.name || ad.vehicleModel || '';

const resolvePhotos = (ad) => {
  if (Array.isArray(ad.photos)) {
    return ad.photos;
  }

  if (Array.isArray(ad.images)) {
    return ad.images;
  }

  if (ad.photoUrl || ad.imageUrl) {
    return [ad.photoUrl || ad.imageUrl];
  }

  return [];
};

export const mapAdEntity = (ad = {}) => {
  const photos = resolvePhotos(ad)
    .map((photo) => (typeof photo === 'string' ? photo : photo?.url || photo?.path || ''))
    .filter(Boolean);

  return {
    ...ad,
    brandName: resolveBrandName(ad),
    modelName: resolveModelName(ad),
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

  const items = (payload?.items || []).map(mapAdEntity);

  return {
    items,
    hasMore: Boolean(payload?.hasMore ?? payload?.nextPage),
  };
};
