import { useState, useEffect } from "react";
import { doc, getDoc, setDoc, updateDoc, increment, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase";

export function usePostViews(slug: string, options: { increment?: boolean } = {}) {
  const [views, setViews] = useState<number | null>(null);

  useEffect(() => {
    if (!slug) return;

    const docRef = doc(db, "views", slug);

    // If we are incrementing, perform the update once on mount.
    if (options.increment) {
      const incrementViews = async () => {
        try {
          // Use a transaction or just simple get/set/update
          // Simple approach as per request: check if exists, create or increment.
          // To ensure atomic increments, updateDoc with increment() is best.
          // But first we need to ensure document exists.

          // Actually, setDoc with merge: true acts like upsert for fields,
          // but increment() requires the doc to exist or setDoc to perform the increment.
          // setDoc(ref, { count: increment(1) }, { merge: true }) works if doc exists or not?
          // No, if doc doesn't exist, increment(1) might start at 1? Yes.

          // Let's try setDoc with merge.
          await setDoc(docRef, { count: increment(1) }, { merge: true });
        } catch (error) {
          console.error("Error incrementing views:", error);
        }
      };

      incrementViews();
    }

    // Subscribe to real-time updates for the view count
    const unsubscribe = onSnapshot(docRef, (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        setViews(data.count ?? 0);
      } else {
        setViews(0);
      }
    });

    return () => unsubscribe();
  }, [slug, options.increment]);

  return views;
}
