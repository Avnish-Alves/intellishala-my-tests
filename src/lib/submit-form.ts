export function submitForm(form: HTMLFormElement | null): void {
  if (!form) {
    return;
  }

  const fields = Array.from(form.elements).filter(
    (element): element is HTMLInputElement | HTMLSelectElement =>
      (element instanceof HTMLInputElement ||
        element instanceof HTMLSelectElement) &&
      element.name !== "" &&
      element.value === "",
  );

  for (const field of fields) {
    field.disabled = true;
  }

  try {
    if (form.requestSubmit) {
      form.requestSubmit();
    } else {
      form.submit();
    }
  } finally {
    for (const field of fields) {
      field.disabled = false;
    }
  }
}
