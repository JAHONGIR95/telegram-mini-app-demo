// 📄 store/readerStore.ts
import { proxy } from "valtio";

export const readerStore = proxy({
  rendition: null as any,
  book: null as any,
  annotations: [] as any[],

  addAnnotation(annotation: any) {
    this.annotations.push(annotation);
    localStorage.setItem("annotations", JSON.stringify(this.annotations));
  },

  removeAnnotation(cfi: string) {
    this.annotations = this.annotations.filter((a) => a.cfi !== cfi);
    localStorage.setItem("annotations", JSON.stringify(this.annotations));
    this.rendition?.annotations.remove(cfi, "highlight");
  },

  loadFromStorage() {
    const saved = localStorage.getItem("annotations");
    if (saved) {
      this.annotations = JSON.parse(saved);
    }
  },
});
