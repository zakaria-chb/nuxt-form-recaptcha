import type { captchaResponse } from "~/type/captcha-response";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const token = body.token;

  if (!token) {
    return { success: false, message: "Le jeton est manquant." };
  }

  const config = useRuntimeConfig();
  const secretKey = config.GOOGLESECRETKEY;

  // Construire l'URL de l'API Google reCAPTCHA v2
  const apiUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${token}`;

  try {
    const response = await $fetch<captchaResponse>(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    if (response.success) {
      return { success: true };
    } else {
      console.error("Erreur de validation reCAPTCHA :", response.errorCodes);
      return { success: false, message: response.errorCodes };
    }
  } catch (error) {
    console.error("Erreur lors de la vérification du reCAPTCHA :", error);
    return { success: false, message: "Erreur de serveur." };
  }
});