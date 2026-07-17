import { useEffect } from 'react';
import api from '../lib/api.js';

// Pulls the admin-editable title/meta description for a given pageKey and applies it to <head>.
export default function PageMeta({ pageKey, fallbackTitle = 'Lustre - Plastic Surgery' }) {
  useEffect(() => {
    let active = true;
    api
      .get(`/page-meta/${pageKey}`)
      .then((res) => {
        if (!active) return;
        const { title, metaDescription } = res.data.data || {};
        document.title = title || fallbackTitle;
        if (metaDescription) {
          let tag = document.querySelector('meta[name="description"]');
          if (!tag) {
            tag = document.createElement('meta');
            tag.name = 'description';
            document.head.appendChild(tag);
          }
          tag.content = metaDescription;
        }
      })
      .catch(() => {
        document.title = fallbackTitle;
      });
    return () => {
      active = false;
    };
  }, [pageKey, fallbackTitle]);

  return null;
}
