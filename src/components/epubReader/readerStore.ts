import { proxy } from "valtio";

export const readerStore = proxy({
  rendition: null as any,
  annotations: [] as any[],

  setRendition(rendition: any) {
    this.rendition = rendition;
  },

  addAnnotation(annotation: any) {
    this.annotations.push(annotation);
    localStorage.setItem("annotations", JSON.stringify(this.annotations));
  },

  removeAnnotation(cfi: string) {
    this.annotations = this.annotations.filter((a) => a.cfi !== cfi);
    localStorage.setItem("annotations", JSON.stringify(this.annotations));
    this.rendition?.annotations.remove(cfi, "highlight");
  },

  updateAnnotationComment(cfi: string, comment: string) {
    const index = this.annotations.findIndex((a) => a.cfi === cfi);
    if (index !== -1) {
      this.annotations[index].comment = comment;
      localStorage.setItem("annotations", JSON.stringify(this.annotations));
    }
  },

  loadFromStorage() {
    const saved = localStorage.getItem("annotations");
    if (saved) {
      this.annotations = JSON.parse(saved);
    }
  },

  loadAnnotationsToRendition() {
    if (!this.rendition) return;
    
    // Avval mavjud annotationlarni tozalash
    this.rendition.annotations.clear("highlight");
    
    // Saqlanganlarni qayta qo'shish
    this.annotations.forEach((annotation) => {
      if (annotation.cfi && annotation.color) {
        this.rendition.annotations.add(
          "highlight",
          annotation.cfi,
          {},
          null,
          annotation.id || `hl-${Date.now()}`,
          {
            fill: annotation.color,
            "fill-opacity": "0.4",
            "mix-blend-mode": "multiply",
          }
        );
      }
    });
  },
});