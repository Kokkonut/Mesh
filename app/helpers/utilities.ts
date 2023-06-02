export function formDataToObject(formData: FormData): Record<string, any> {
    let object: Record<string, any> = {};
    for (let pair of formData.entries()) {
      object[pair[0]] = pair[1];
    }
    return object;
  }
  