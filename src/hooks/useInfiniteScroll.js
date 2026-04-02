import { useEffect, useRef } from 'react';

const useInfiniteScroll = ({ onLoadMore, hasMore, loading }) => {
  const observerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const [entry] = entries;
      if (entry.isIntersecting && hasMore && !loading) {
        onLoadMore();
      }
    });

    const current = observerRef.current;
    if (current) {
      observer.observe(current);
    }

    return () => {
      if (current) {
        observer.unobserve(current);
      }
      observer.disconnect();
    };
  }, [hasMore, loading, onLoadMore]);

  return observerRef;
};

export default useInfiniteScroll;
