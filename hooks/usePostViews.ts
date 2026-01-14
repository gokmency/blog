import { useState, useEffect } from "react";
import { doc, getDoc, setDoc, increment, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase";

export function usePostViews(slug: string, options: { increment?: boolean } = {}) {
  const [views, setViews] = useState<number | null>(null);

  useEffect(() => {
    if (!slug) return;

    const docRef = doc(db, "views", slug);

    const init = async () => {
      try {
        // 1. On mount: Immediately getDoc from Firestore to fetch the current count and display it.
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setViews(docSnap.data().count ?? 0);
        } else {
          setViews(0);
        }

        // 2. Then, run the increment logic.
        if (options.increment) {
          await setDoc(docRef, { count: increment(1) }, { merge: true });

          // 3. Ensure the UI shows the specific number from the database.
          // Fetch again to get the updated value.
          const updatedSnap = await getDoc(docRef);
          if (updatedSnap.exists()) {
            setViews(updatedSnap.data().count ?? 0);
          }
        }
      } catch (error) {
        // 4. Add a console.log for any Firebase permission errors.
        console.error("Firebase error:", error);
      }
    };

    init();

    // Keep onSnapshot for real-time updates from other users,
    // but the initial load and increment are handled explicitly above as requested.
    const unsubscribe = onSnapshot(docRef, (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        setViews(data.count ?? 0);
      }
    }, (error) => {
      console.error("Firebase snapshot error:", error);
    });

    return () => unsubscribe();
  }, [slug, options.increment]);

  return views;
}
