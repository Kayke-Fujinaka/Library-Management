import { z } from 'zod';

export function customString(fieldName: string, message?: string) {
  return z.string({
    invalid_type_error: message || `O ${fieldName} deve ser uma string.`,
  });
}

export function customUUID(fieldName: string, message?: string) {
  return customString('UUID').refine(
    (id) => {
      const uuidRegex =
        /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-5][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/;
      return uuidRegex.test(id);
    },
    {
      message: message || `O ${fieldName} deve ser um UUID.`,
    },
  );
}
