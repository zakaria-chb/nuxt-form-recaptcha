<template>
  <div class="flex min-h-screen bg-slate-100">
    <section class="container grid items-center grid-cols-12 gap-10 mx-auto">
      <div
        class="col-span-4 h-[600px] bg-slate-200/50 flex justify-center items-center rounded-tl-3xl rounded-br-3xl"
      >
        <img
          src="/public/contact.svg"
          class="px-2"
        />
      </div>
      <div class="flex flex-col col-span-6">
        <span class="mb-14 text-8xl"> Contact Us </span>

        <form @submit.prevent="submitForm()" class="flex flex-col gap-10">
          <input
            type="text"
            v-model="formValues.fullName"
            placeholder="Full Name"
            class="w-2/3 bg-transparent outline-none border-b-4 border-[#6C63FF] text-2xl pb-2 pl-2 transition-transform duration-300 ease-in-out focus:scale-105 focus:border-yellow-400"
          />
          <input
            type="email"
            v-model="formValues.email"
            placeholder="Email"
            class="w-2/3 bg-transparent outline-none border-b-4 border-[#6C63FF] text-2xl pb-2 pl-2 transition-transform duration-300 ease-in-out focus:scale-105 focus:border-yellow-400"
          />
          <textarea
            v-model="formValues.message"
            placeholder="Message"
            class="w-2/3 resize-none h-28 bg-transparent outline-none border-b-4 border-[#6C63FF] text-2xl pb-2 pl-2 transition-transform duration-300 ease-in-out focus:scale-105 focus:border-yellow-400"
          />

          <div class="flex items-center gap-6">
            <div class="g-recaptcha" :data-sitekey="siteKey"></div>

            <button
              class="flex w-1/5 py-5 justify-center text-white text-xl rounded-3xl bg-[#6C63FF] hover:bg-yellow-500 duration-300 ease-in-out hover:scale-110 transition-all"
            >
              Contact Us
            </button>
          </div>
        </form>
      </div>
      <div class="flex flex-col col-span-2 space-y-20">
        <div class="flex flex-col">
          <span class="mb-1 text-4xl font-semibold">Contact</span>
          <span class="text-2xl">contact@mail.fr</span>
        </div>
        <div class="flex flex-col">
          <span class="text-4xl font-semibold">Based In</span>
          <span class="text-2xl"
            >Marseille - <br />
            Paris - Lille</span
          >
        </div>
        <div class="flex gap-5 text-3xl">
          <Icon name="line-md:instagram" />
          <Icon name="line-md:facebook" />
          <Icon name="line-md:twitter-x" />
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts" setup>
const config = useRuntimeConfig();
const siteKey = config.public.GOOGLEKEYSITE;

const formValues = ref({
  fullName: "",
  email: "",
  message: "",
});

const submitForm = async () => {
  const recaptchaElement = document.querySelector(".g-recaptcha-response");

  if (recaptchaElement) {
    const recaptchaResponse = (recaptchaElement as HTMLInputElement).value;

    const isRecaptchaValid = await validateRecaptcha(recaptchaResponse);

    if (!isRecaptchaValid) {
      console.log("Erreur de validation reCAPTCHA.");
      return;
    }
  } else {
    console.log("Erreur de validation reCAPTCHA.");
    return;
  }

  try {
    await $fetch("/api/contact", {
      method: "POST",
      body: formValues.value,
    });

    formValues.value.fullName = "";
    formValues.value.email = "";
    formValues.value.message = "";
  } catch (error) {
    console.log(error);
  }
};

const validateRecaptcha = async (token: string) => {
  try {
    const response = await $fetch("/api/recaptcha-validation", {
      method: "POST",
      body: { token },
    });

    if (response && typeof response.success === "boolean") {
      return response.success;
    } else {
      console.error("La réponse du serveur est mal formée :", response);
      return false;
    }
  } catch (error) {
    console.error("Erreur lors de la vérification du reCAPTCHA :", error);
    return false;
  }
};

onMounted(() => {
  const reCaptchaScript = document.createElement("script");
  reCaptchaScript.src = "https://www.google.com/recaptcha/api.js";
  reCaptchaScript.async = true;
  reCaptchaScript.defer = true;
  document.head.appendChild(reCaptchaScript);
});
</script>

<style></style>
